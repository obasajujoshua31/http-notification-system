const Topic = require("../models/topic");
const Subscriber = require("../models/subscriber");
const axios = require("axios");
const logger = require("../logger");
const { BADREQUEST, INTERNALSERVERERROR, OK } = require("../constants");

module.exports.handleSubscribeTopic = async (req, res) => {
  try {
    const {
      params: { topic },
      body: { url },
    } = req;

    if (typeof url === "undefined") {
      return res.status(BADREQUEST).send("url cannot be empty");
    }

    if (!isValidHttpUrl(url)) {
      return res.status(BADREQUEST).send("url is not valid");
    }

    if (!(await pingSubscriberEndpointSucceeds(url))) {
      return res
        .status(BADREQUEST)
        .send("the subscribing server did not respond");
    }

    const [createdTopic] = await Topic.findOrCreate({
      where: { topic },
      defaults: { topic },
    });

    await Subscriber.findOrCreate({
      where: {
        topicId: createdTopic.id,
        url,
      },
      defaults: { topicId: createdTopic.id, url },
    });

    return res.status(OK).json({
      url,
      topic,
    });
  } catch (error) {
    logger("publisher-service").error(`error occured ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("unknown error occured, please try again");
  }
};

module.exports.handlePublishMessageToTopic = async (req, res) => {
  try {
    const { topic } = req.params;

    const foundTopic = await Topic.findOne({
      where: {
        topic,
      },
      include: [
        {
          model: Subscriber,
        },
      ],
    });

    if (!foundTopic) {
      return res.status(OK).send("OK");
    }

    const publishedMessages = foundTopic.Subscribers.map((subscriber) => {
      return postRequest(subscriber.url, {
        topic: foundTopic.topic,
        data: req.body,
      });
    });

    Promise.all(publishedMessages)
      .then(() => {
        return res.status(OK).json({
          success: true,
          message: "All subscribers notified successfully",
          noOfSubscribers: foundTopic.Subscribers.length,
        });
      })
      .catch((error) => {
        logger("publisher-service").error(`error occured ${error.message}`);
        return res.status(400).send("We are unable to notify all subscribers");
      });
  } catch (error) {
    logger("publisher-service").error(`error occured ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("unknown server error, please try again later");
  }
};

const isValidHttpUrl = (urlString) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const pingSubscriberEndpointSucceeds = async (url) => {
  try {
    await postRequest(url, { test: "OK" });

    return true;
  } catch (_) {
    return false;
  }
};

const postRequest = async (url, data) => {
  return await axios.default.post(url, data, { timeout: 500 });
};

const { Router } = require("express");
const {
  handlePublishMessageToTopic,
  handleSubscribeTopic,
} = require("./controller");
const router = Router();

router.post("/subscribe/:topic", handleSubscribeTopic);
router.post("/publish/:topic", handlePublishMessageToTopic);

module.exports = router;

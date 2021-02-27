const { sequelize, Sequelize } = require("./index");
const Subscriber = require("./subscriber");
const topicSchema = {
  topic: {
    type: Sequelize.STRING,
    allowNullL: false,
    index: true,
  },
};

const topic = sequelize.define("Topic", topicSchema, {});

topic.hasMany(Subscriber, {
  foreignKey: "topicId",
});

module.exports = topic;
module.exports.sequelize = sequelize;

const { sequelize, Sequelize } = require("./index");

const subscriberSchema = {
  url: {
    type: Sequelize.STRING,
    allowNullL: false,
  },
  topicId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

module.exports = sequelize.define("Subscriber", subscriberSchema, {
  indexes: [
    {
      unique: true,
      fields: ["topicId", "url"],
    },
  ],
});


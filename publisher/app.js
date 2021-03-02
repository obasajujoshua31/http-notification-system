const express = require("express");
require("dotenv").config();
const { handleNotFound, initAppMiddlewares } = require("./app.middleware");
const { sequelize } = require("./models/topic");
const app = express();

const serviceName = "publisher-service";

const routes = require("./api/routes");

//Initialize app middlewares
initAppMiddlewares(app);

const port = process.env.PORT || 8000;

// initialize app routes
app.use("/", routes);

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound(serviceName));

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync().then(() => {
      app.listen(port, () => {
        console.log(`Server listening on port ... ${port}`);
      });
    });
  })
  .catch((error) => {
    console.error("Unable to connect to SQLite Database", error);
    process.exit(1);
  });

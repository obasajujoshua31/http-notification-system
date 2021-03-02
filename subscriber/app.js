const express = require("express");
require("dotenv").config();
const { handleNotFound, initAppMiddlewares } = require("./app.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const app = express();

const routes = require("./api/routes");
const serviceName = "subscriber-service";
//Initialize app middlewares
initAppMiddlewares(app);

const port = process.env.PORT || 9000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// initialize app routes
app.use("/", routes);

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound(serviceName));

app.listen(port, () => {
  console.log(`Server listening on port ... ${port}`);
});

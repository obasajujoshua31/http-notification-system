const express = require("express");
require("dotenv").config();
const {
  handleNotFound,
  initAppMiddlewares,
} = require("./../common/app.middleware");
const app = express();

const routes = require("./api/routes");
const serviceName = "subscriber-service";
//Initialize app middlewares
initAppMiddlewares(app);

const port = process.env.PORT || 9000;

// initialize app routes
app.use("/", routes);

// initialize swagger doc route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound(serviceName));

// const connection = connectToDb(config.dbUrl);

// Close all existing connection before exit
// process.on("exit", () => {
//   mongoose.connection.close();
// });

// Connect to Database and start the server on success, exit other wise.
// connection
//   .then(() => {
//     console.log("MongoDB Connected!");
//     app.listen(port, console.log(`<== SERVER started at ${port} ==>`));
//   })
//   .catch((error) => {
//     console.error("Unable to connect to MongoDB Database", error);
//     process.exit(1);
//   });

app.listen(port, () => {
  console.log(`Server listening on port ... ${port}`);
});

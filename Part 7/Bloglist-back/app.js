require("dotenv").config();
const express = require("express");
const config = require("./utils/config");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

logger.info("Connecting to ", config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL)
  .then(() => logger.info("connected"))
  .catch((err) => logger.error("error has occurred", err.message));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testingRouter");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.tokenExtractor);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

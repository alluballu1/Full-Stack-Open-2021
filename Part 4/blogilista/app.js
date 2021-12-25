const express = require("express");
const config = require("./utils/config");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");

logger.info("Connecting to ", config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL)
  .then(() => logger.info("connected"))
  .catch((err) => logger.error("error has occurred", err.message));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;

const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users.map((user) => user.toJSON())).status(200);
});

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  await user
    .save()
    .then((result) => response.json(result))
    .catch((err) => next(err));
});

module.exports = usersRouter;

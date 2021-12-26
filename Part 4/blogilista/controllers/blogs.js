require("dotenv").config();
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response, next) => {
  const fetchedBlogs = await Blog.find({}).populate("user");
  response.json(fetchedBlogs.map((each) => each.toJSON())).status(200);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = request.user;

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog(body);
    body.user = user._id;
    if (!blog.title || !blog.url) {
      return response.status(400).end();
    }
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();

    response.json(newBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const find = await Blog.findById(request.params.id);
    const decodedToken = request.user;
    if (decodedToken.id === find.user.toString()) {
      const blog = await Blog.findByIdAndDelete(request.params.id);
      response.status(204).json(blog);
    } else {
      return response.status(401).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  console.log(request.body, "dffsf");
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then((result) => response.status(200).json(result).end())
    .catch((error) => next(error));
});

module.exports = blogsRouter;

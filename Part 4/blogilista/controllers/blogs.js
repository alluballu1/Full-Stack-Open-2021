const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = new Blog(body);
  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }
  await blog.save().then((result) => {
    response.status(200).json(result);
  });
});

module.exports = blogsRouter;

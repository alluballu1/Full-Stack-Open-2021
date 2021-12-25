const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

const blogs = [
  {
    title: "My Blog 1",
    author: "Alex",
    url: "www.temp.fi",
    likes: 10,
    id: "61c770eab162d8b334490f23",
  },
  {
    title: "My Blog 2",
    author: "Alex",
    url: "www.temp.com",
    likes: 4,
    id: "61c770ebb162d8b334490f25",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(blogs[0]);
  await blogObject.save();
  blogObject = new Blog(blogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
});

test("id exists", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("posting works and like is given a default value of zero", async () => {
  const newBlog = {
    title: "My Blog 5",
    author: "Alex",
    url: "www.temp.fi",
  };
  await api.post("/api/blogs").send(newBlog).expect(200);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(blogs.length + 1);
  expect(response.body[blogs.length].likes).toBe(0);
});

test("Testing that posting without a title or url will return an error code", async () => {
  const blogNoUrl = {
    title: "My Blog 5",
    author: "Alex",
  };
  await api.post("/api/blogs").send(blogNoUrl).expect(400);
  const blogNotitle = {
    author: "Alex",
    url: "www.temp.fi",
  };
  await api.post("/api/blogs").send(blogNotitle).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const blogs = require("./blog_lists");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs.oneBlog);
});

test("length of blogs", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(1);
});

test("id property of blog", async () => {
  const res = await api.get("/api/blogs");
  const allIds = res.body.map((blog) => blog.id);
  allIds.forEach((id) => expect(id).toBeDefined());
});

test("blog is added", async () => {
  const blog = {
    title: "blog",
    author: "author",
    url: "https://www.fullstackopen.com",
    likes: 1,
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});

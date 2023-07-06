const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const blogs = require("./blog_lists");

const api = supertest(app);

let token = null;
beforeAll(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const passwordHash = await bcrypt.hash("12345", 10);
  const user = await new User({ username: "name", passwordHash }).save();

  const userForToken = { username: "name", id: user.id };
  return (token = jwt.sign(userForToken, config.SECRET));
});

test("length of blogs", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(0);
});

test("id property of blog", async () => {
  const res = await api.get("/api/blogs");
  const allIds = res.body.map((blog) => blog.id);
  allIds.forEach((id) => expect(id).toBeDefined());
});

test("blog is added", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "https://www.fullstackopen.com",
    likes: 1,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

test("likes property should be 0 if not passed", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "https://www.fullstackopen.com",
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const totalBlogs = await Blog.find({});
  expect(totalBlogs[totalBlogs.length - 1].likes).toBe(0);
});

test("return 400 response if any required data is missing", async () => {
  const blog = {
    author: "author",
    url: "https://www.fullstackopen.com",
    likes: 1,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(400);
});

test("deleting a blog", async () => {
  const blogs = await Blog.find({});
  console.log(blogs);
  await api
    .delete(`/api/blogs/${blogs[0].id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);
});

test("updating a blog", async () => {
  const blogs = await Blog.find({});
  await api.put(`/api/blogs/${blogs[0].id}`).expect(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("length of blogs", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(1);
});

test("id property of blog", async () => {
  const res = await api.get("/api/blogs");
  const allIds = res.body.map((blog) => blog.id);
  allIds.forEach((id) => expect(id).toBeDefined());
});

afterAll(async () => {
  await mongoose.connection.close();
});

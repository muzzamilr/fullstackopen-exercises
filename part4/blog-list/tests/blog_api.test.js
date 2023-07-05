const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(1);
});

afterAll(async () => {
  await mongoose.connection.close();
});

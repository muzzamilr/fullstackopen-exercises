const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const supertest = require("supertest");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  expect(usernames).toContain(newUser.username);
});

test("if user exists then return status code 400", async () => {
  const users = await User.find({});

  await api.post("/api/users").send(users[0]).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});

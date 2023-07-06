const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { body, user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const user = request.user;
  const blog = await Blog.findById({ _id: id });

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (blog.user.toString() !== user.id.toString()) {
    response.status(401).json({ error: "Unauthorized" });
  }

  await Blog.deleteOne({ _id: id });
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;

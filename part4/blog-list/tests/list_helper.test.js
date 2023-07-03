const listHelper = require("../utils/list_helper");
const blogLists = require("./blog_lists");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

test("when list has only one blog, equals the likes of that", () => {
  const result = listHelper.totalLikes(blogLists.oneBlog);
  expect(result).toBe(5);
});

test("favorite blog", () => {
  const result = listHelper.favoriteBlog(blogLists.manyBlogs);
  expect(result).toEqual({
    title: "Go To Statement ",
    author: "W. ",
    likes: 6,
  });
});

test("most likes", () => {
  const result = listHelper.mostLikes(blogLists.manyBlogs);
  expect(result).toEqual({ author: "W. ", likes: 6 });
});

test("most blogs", () => {
  const result = listHelper.mostBlogs(blogLists.manyBlogs);
  expect(result).toEqual({ author: "Edsger W. ", blogs: 3 });
});

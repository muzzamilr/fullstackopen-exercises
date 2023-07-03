const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const mostLiked = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  });
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  let authorCount = {};

  blogs.forEach((blog) => {
    if (authorCount[blog.author]) {
      authorCount[blog.author] += 1;
    } else {
      authorCount[blog.author] = 1;
    }
  });
  const author = Object.keys(authorCount).reduce((prev, curr) => {
    if (authorCount[prev] > authorCount[curr]) {
      return prev;
    }
    return curr;
  });
  return {
    author: author,
    blogs: authorCount[author],
  };
};

const mostLikes = (blogs) => {
  if (blogs.lengt === 0) return null;
  let authorCount = {};

  blogs.forEach((blog) => {
    if (authorCount[blog.author]) {
      authorCount[blog.author] += blog.likes;
    } else {
      authorCount[blog.author] = blog.likes;
    }
  });

  const author = Object.keys(authorCount).reduce((prev, curr) => {
    if (authorCount[prev] > authorCount[curr]) {
      return prev;
    }
    return curr;
  });
  return {
    author: author,
    likes: authorCount[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};

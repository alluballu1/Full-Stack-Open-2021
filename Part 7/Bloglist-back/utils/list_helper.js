const _ = require("lodash");

const dummy = (blogs) => {
  const list = [blogs];
  return 1;
};

const totalLikes = (blogs) => {
  let val = 0;
  blogs.forEach((element) => {
    val += element.likes;
  });
  return val;
};

const favoriteBlog = (blogs) => {
  let favorite = {};
  let val = 0;
  blogs.forEach((element) => {
    if (element.likes >= val) {
      favorite = element;
      val = element.likes;
    }
  });
  return favorite;
};

const mostBlogs = (blogs) => {
  const amount = _.countBy(blogs, function (each) {
    return each.author;
  });
  const highestAmount = Math.max(...Object.values(amount));
  return highestAmount;
};

const mostLikes = (blogs) => {
  let authors = [];
  const amount = _.countBy(blogs, function (each) {
    return each.author;
  });
  Object.keys(amount).forEach((element) => {
    authors.push({ author: element, likes: 0 });
  });
  authors.forEach((author) => {
    blogs.forEach((blog) => {
      if (author.author === blog.author) {
        author.likes += blog.likes;
      }
    });
  });

  let highestLikeCountOwner = _.maxBy(authors, function (each) {
    return each.likes;
  });

  return highestLikeCountOwner;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

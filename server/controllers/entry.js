const Blog = require("../models/entry");
const User = require("../models/user");
const validator = require("validator");

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({ user: req.user });
  res.json(blogs);
};

const addBlog = async (req, res) => {
  const { title, link, description, type, tags } = req.body;

  if (!link || !validator.isURL(link)) {
    return res.status(401).send({ error: "Valid URL is required" });
  }

  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).send({ error: "User doesn't exist " });
  }

  const blog = new Blog({
    title,
    link,
    description,
    type,
    tags,
    user: user._id,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
};

const deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const user = await User.findById(req.user);
  const blog = await Blog.findById(blogId);

  if (!user) {
    return res.status(404).send({ error: "User doesn't exist" });
  }

  if (!blog) {
    return res
      .status(404)
      .send({ error: `Blog with ID : ${blogId} doesn\'t exist.` });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: "Access is denied" });
  }

  await Blog.findByIdAndDelete(blogId);
  res.status(204).end();
};

const updateBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const { title, link, description, type, tags } = req.body;

  if (!title || !link || !description || !type || !tags) {
    return res.status(400).send({ error: "Not all fields present" });
  }

  if (!link || !validator.isURL(link)) {
    return res
      .status(401)
      .send({ error: "Valid URL is required for link field." });
  }

  const user = await User.findById(req.user);
  const blog = await Blog.findById(blogId);

  if (!user) {
    return res.status(404).send({ error: "User does not exist in database." });
  }

  if (!blog) {
    return res.status(404).send({
      error: `Entry with ID: ${blogId} does not exist in database.`,
    });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: "Access is denied." });
  }

  const updatedBlogObj = {
    title,
    link,
    description,
    type,
    tags,
    user: user._id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedBlogObj, {
    new: true,
  });
  res.json(updatedBlog);
};

const starBlog = async (req, res) => {
  const { id: blogId } = req.params;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return res
      .status(404)
      .send({ error: `Blog with ID: ${blogId} doesn\'t exist` });
  }

  blog.isStarred = !blog.isStarred;

  await blog.save();
  res.status(202).end();
};

const markBlogAsViewed = async (req, res) => {
  const { id: entryId } = req.params;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return res.status(404).send({
      error: `Entry with ID: ${blogId} does not exist in database.`,
    });
  }

  blog.isViewed = !blog.isViewed;

  await entry.save();
  res.status(202).end();
};

module.exports = {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  starBlog,
  markBlogAsViewed,
};

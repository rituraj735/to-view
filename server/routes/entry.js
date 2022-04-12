const express = require("express");
const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  starBlog,
  markBlogAsViewed,
} = require("../controllers/entry");

const router = express.Router();

router.get("/", getBlogs);
router.post("/", addBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);
router.patch("/:id/star", starBlog);
router.patch("/:id/view", markBlogAsViewed);

module.exports = router;

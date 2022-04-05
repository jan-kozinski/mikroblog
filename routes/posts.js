const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getPosts,
  addPost,
  deletePost,
} = require("../controllers/postsController");
const paginateResults = require("../middleware/paginate");
const Post = require("../models/Post");

//Fetch page of posts
router.route("/").get(paginateResults(Post), getPosts).post(addPost);
router.route("/author/:authorname").get(paginateResults(Post), getPosts);

//Delete post of given id,
//user must be logged as an author of the post to proceed
router.route("/:id").delete(auth, deletePost);

module.exports = router;

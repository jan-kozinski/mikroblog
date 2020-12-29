const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  author: {
    type: String,
    trim: true,
    required: [true, "User must be logged in order to add a post"],
  },
  authorId: {
    type: String,
    trim: true,
    required: [true, "User must be logged in order to add a post"],
  },
  imageURL: {
    type: String,
    trim: true,
  },
  imageKey: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likersIds: {
    type: [{ type: String }],
    default: [],
  },
  createdAt: {
    type: Date,
    required: [true, "Internal server error"],
  },
});

module.exports = mongoose.model("Post", PostSchema, "posts");

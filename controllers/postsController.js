const Post = require("../models/Post");

//@desc     Get all transactions
//@route    GET /api/mikroblog
//@access   Public

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `Server error: ${error}`,
    });
  }
};

//@desc     Add post
//@route    POST /api/mikroblog
//@access   Public

exports.addPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const post = await Post.create(req.body);

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: `Internal Server Error`,
      });
    }
  }
};

//@desc     DELETE post
//@route    GET /api/mikroblog/:id
//@access   Public

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post with given ID doesn't exist",
      });
    }

    await post.remove();

    return res.status(200).json({ succes: true, data: [] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `Internal Server Error:`,
    });
  }
};
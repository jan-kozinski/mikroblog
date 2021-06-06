const Post = require("../models/Post");
const User = require("../models/User");
const s3 = require("../config/s3");

//@desc     Get all posts
//@route    GET /api/mikroblog
//@access   Public

exports.getPosts = async (req, res, next) => {
  try {
    //If the pagination middleware is working respond with paginated results
    if (res.paginatedResults) {
      const { currentPagePosts, prevPage, nextPage } = res.paginatedResults;

      if (currentPagePosts.length) {
        return res.status(200).json({
          success: true,
          count: currentPagePosts.length,
          posts: currentPagePosts,
          prevPage,
          nextPage,
        });
      } else {
        return res.status(404).json({
          success: false,
          error: `No such page`,
        });
      }
    }
    //However if the pagination middleware IS NOT working respond with all posts
    else {
      const posts = await Post.find();

      return res.status(200).json({
        success: true,
        count: posts.length,
        posts: posts,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `Internal Server Error`,
    });
  }
};

//@desc     Add post
//@route    POST /api/mikroblog
//@access   Public

exports.addPost = async (req, res, next) => {
  try {
    const { text, author, authorId } = req.body;
    // Get post author
    const authorExist = User.findOne({ name: author, _id: authorId });
    // If author doesn't exists in DB return error
    if (!authorExist)
      return res.status(401).json({
        success: false,
        error: "No user found",
      });

    // Create the post
    const post = await Post.create({ ...req.body, createdAt: new Date() });

    return res.status(201).json({
      success: true,
      post,
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
//@access   Private

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post with given ID doesn't exist",
      });
    }

    if (req.user.id !== post.authorId)
      return res.status(401).json({
        success: false,
        error: "Access denied: invalid token",
      });

    //If post contains an image remove it from the storage
    if (post.imageKey) {
      await s3.deleteObject(
        {
          Key: post.imageKey,
          Bucket: process.env.AWS_BUCKET_NAME,
        },
        (err, data) => {
          if (err) {
            console.error(err);
            throw err;
          }
        }
      );
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

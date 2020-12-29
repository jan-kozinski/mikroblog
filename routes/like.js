const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.route("/:id").post(auth, async (req, res) => {
  var { id } = req.params;
  try {
    const post = await Post.findById(id);
    let likesCountToRespond = post.likes;
    let likersIdsToRespond = post.likersIds;
    if (!post.likersIds.includes(req.user.id)) {
      Post.updateOne(
        { _id: id },
        { $inc: { likes: 1 }, $push: { likersIds: req.user.id } },
        (err, rawResponse) => {
          if (err) throw err;
        }
      );
      likesCountToRespond++;
      likersIdsToRespond.push(req.user.id);
    } else {
      Post.updateOne(
        { _id: id },
        { $inc: { likes: -1 }, $pull: { likersIds: req.user.id } },
        (err, rawResponse) => {
          if (err) throw err;
        }
      );
      likesCountToRespond--;
      likersIdsToRespond = likersIdsToRespond.filter(
        (element, index, array) => {
          return element !== req.user.id;
        }
      );
    }

    res.status(200).json({
      succes: true,
      likes: likesCountToRespond,
      likersIds: likersIdsToRespond,
    });
  } catch (error) {
    res.status(500).json({ succes: false, error });
  }
});

module.exports = router;

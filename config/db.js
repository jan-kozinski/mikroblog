const mongoose = require("mongoose");
const Post = require("../models/Post");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    /*---FILLING DATABASE WITH BOILERPLATE POSTS----*/
    // if (!(await Post.countDocuments().exec()) > 0) {
    //   let postsBoilerplate = [];
    //   for (let i = 1; i <= 25; i++) {
    //     postsBoilerplate.push({
    //       text: `Post number ${i}, lorem ipsum jebać pis`,
    //       author: "cycu_kiepski",
    //       authorId: "5f22bf81f0fa233f57c8fe80",
    //     });
    //   }

    //   Promise.all([
    //     postsBoilerplate.forEach(async (post) => await Post.create(post)),
    //   ]).then(() =>
    //     console.log(
    //       "Added a few posts to the database for the collection to not be empty"
    //     )
    //   );
    // }
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

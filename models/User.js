const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: /^\w{5,16}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("User", UserSchema, "users");

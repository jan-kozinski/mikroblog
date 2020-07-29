const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  getUserData,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

//Register user
router.post("/register", registerUser);
//Login user
router.post("/auth", authUser);
//Get user data
router.get("/auth", auth, getUserData);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  getUserData,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/auth", auth, authUser);
router.get("/auth", auth, getUserData);

module.exports = router;

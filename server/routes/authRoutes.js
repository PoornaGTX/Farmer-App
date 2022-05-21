const express = require("express");
const authenticateUser = require("../middleware/auth");
const router = express.Router();
const {
  login,
  register,
  updateUser,
} = require("../controllers/authControllers");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  login,
  register,
  deleteUser,
  updatePassword,
  user,
  getAdmins,
} = require("../controllers/adminLoginController");

// Login route
router.post("/login", login);

// Add user route
router.post("/add-user", register);

// Delete user route
router.delete("/delete-user/:Email", deleteUser);

// Update password route
router.put("/update-password", updatePassword);

// Get User Information
router.route("/user").get(authMiddleware, user);

// get all user
router.get("/get-user", getAdmins);

module.exports = router;

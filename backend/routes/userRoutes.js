const express = require("express");
const {
  updateProfile,
  deleteProfile,
  logout,
  signup,
  login,
} = require("../controller/userController");
const { protectRoutes } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile/:id", protectRoutes, updateProfile);

router.delete("/:id", deleteProfile);
module.exports = router;

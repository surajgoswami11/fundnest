const express = require("express");
const {
  updateProfile,
  deleteProfile,
  logout,
  signup,
  login,
} = require("../controller/userController");
//
const { protectRoutes } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/signup", upload.single("profilePic"), signup);
router.post("/login", login);
router.post("/logout", logout);

router.put(
  "/update-profile/:id",
  protectRoutes,
  upload.single("profilePic"),
  updateProfile
);

router.delete("/:id", deleteProfile);

module.exports = router;

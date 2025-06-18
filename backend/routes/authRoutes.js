const express = require("express");
const {
  updateProfile,
  deleteProfile,
  logout,
  signup,
  login,
} = require("../controller/authController");
//
const { protectRoutes } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const passport = require("passport");

const router = express.Router();

//google id getting
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);

// FACEBOOK
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);

router.post("/signup", upload.single("profilePic"), signup);
router.post("/login", login);
router.post("/logout", logout);

router.put(
  "/update-profile/:id",
  upload.single("profilePic"),
  protectRoutes,
  updateProfile
);

router.delete("/:id", protectRoutes, deleteProfile);

module.exports = router;

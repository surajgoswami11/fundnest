const express = require("express");
const {
  updateProfile,
  deleteProfile,
  logout,
  signup,
  login,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", updateProfile);

router.delete("/:id", deleteProfile);
module.exports = router;

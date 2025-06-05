const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Token!" });
    }

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    if (!verify) {
      return res.status(400).json({
        success: false,
        message: "Invalid User!",
      });
    }
    const user = await User.findById(verify.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const jwt = require("jsonwebtoken");

exports.generateToken = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return token;
  } catch (error) {
    console.log("token genration failed", error.message);
  }
};

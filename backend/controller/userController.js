const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/token");

// register user
// signup
exports.signup = async (req, res) => {
  try {
    const { email, password, userName, location, profilePic, contactNumber } =
      req.body;

    if (!userName || !password || !email || !contactNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Please Fill All Required Feilds" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password Must Be 6 Charcters Long" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "E-mail Already exists",
      });
    }

    //
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      userName,
      email,
      password: hashPass,
      location,
      profilePic,
      contactNumber,
    });

    const token = await generateToken(user._id, res);

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        profilePic: user.profilePic,
        location: user.location,
        contactNumber: user.contactNumber,
      },
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email And Password Must" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = await generateToken(user._id, res);

    res.status(200).json({
      success: true,
      message: "User Logged in Successfully`",
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        profilePic: user.profilePic,
        location: user.location,
        contactNumber: user.contactNumber,
      },
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// user log-out
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// update-user
exports.updateProfile = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

// delete-user
exports.deleteProfile = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

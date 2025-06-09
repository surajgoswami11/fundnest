const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/token");
const cloudinary = require("../utils/cloudinary");

// register user,signup
exports.signup = async (req, res, next) => {
  try {
    const { email, password, userName, location, contactNumber } = req.body;

    if (!userName || !password || !email || !contactNumber) {
      res.status(400);
      return next(new Error("Please Fill All Required Fields"));
    }

    if (password.length < 6) {
      res.status(400);
      return next(new Error("Password must be at least 6 characters long"));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409);
      return next(new Error("Email Already exists"));
    }

    // image verify for upload
    let profilePic = null;
    if (req.file) {
      const cloudImg = await cloudinary.uploadOnCloudinary(req.file.path);
      if (!cloudImg) {
        return next(new Error("Image not provided"));
      }
      profilePic = cloudImg.secure_url;
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
    next(error);
  }
};

// user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      return next(new Error("Email and Password are required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      return next(new Error("Invalid Credentials"));
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      res.status(400);
      return next(new Error("Invalid Credentials"));
    }

    const token = await generateToken(user._id, res);

    res.status(200).json({
      success: true,
      message: "User logged in Successfully",
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
    next(error);
  }
};

// user log-out
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// update-user
exports.updateProfile = async (req, res, next) => {
  try {
    const { contactNumber, userName, location } = req.body;
    const { id } = req.params;

    //
    let profilePic = null;
    if (req.file) {
      const cloudImage = await cloudinary.uploadOnCloudinary(req.file.path);
      profilePic = cloudImage.secure_url;
    }

    //
    const updateFile = {
      contactNumber,
      userName,
      location,
    };

    if (profilePic) {
      updateFile.profilePic = profilePic;
    }

    const updateUser = await User.findByIdAndUpdate(id, updateFile, {
      new: true,
    });
    res.status(200).json({ success: true, updateUser });
  } catch (error) {
    next(error);
  }
};

// delete-user
exports.deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      return next(new Error("User Not Found"));
    }

    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};

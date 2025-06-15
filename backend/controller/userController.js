const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/token");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const createError = require("http-errors");

// register user,signup
exports.signup = async (req, res, next) => {
  try {
    const { email, password, userName, contactNumber, country, state, city } =
      req.body;

    if (!userName || !password || !email || !contactNumber) {
      return next(createError(400, "All feilds Required"));
    }

    if (password.length < 6) {
      return next(createError(400, "Password must be at least 6 characters"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email already exists"));
    }

    //
    let imageurl = "";
    // image verify for upload
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.buffer);
      console.log(result);

      imageurl = result?.secure_url;
    }

    //
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      userName,
      email,
      password: hashPass,
      profilePic: imageurl,
      contactNumber,
      country,
      state,
      city,
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
        contactNumber: user.contactNumber,
        country: user.country,
        state: user.state,
        city: user.city,
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
      return next(createError(400, "Email and Password are required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(401, "Invalid Credentials"));
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return next(createError(401, "Invalid Credentials"));
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

exports.updateProfile = async (req, res, next) => {
  try {
    const { userName, contactNumber, location } = req.body;
    const { id } = req.params;

    let profilePic = "";

    if (req.file) {
      const updateImg = await uploadOnCloudinary(req.file.buffer);
      profilePic = updateImg.secure_url;
    }

    const updateFile = {
      userName,
      contactNumber,
      location,
    };

    if (profilePic) {
      updateFile.profilePic = profilePic;
    }

    const updateUser = await User.findByIdAndUpdate(id, updateFile, {
      new: true,
    });

    if (!updateUser) {
      return next(createError(404, "User not found"));
    }
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
      return next(createError(404, "User Not Found"));
    }

    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};

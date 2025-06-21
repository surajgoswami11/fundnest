const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/token");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const createError = require("http-errors");

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return createError(404, "User not found");
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find({ role: "user" }).select("-password");

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

//
exports.pendingKYC = async (req, res, next) => {
  try {
    const user = await User.find({ kycStatus: "pending" }).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

//
exports.resolve = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    user.kyc.status = "reslove";
    await user.save();

    res.status(200).json({ success: true, message: "KYC approved" });
  } catch (error) {
    next(error);
  }
};

//
exports.reject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    user.key.status = "reject";
    await user.save();

    res.status(200).json({ success: true, message: "KYC rejected" });
  } catch (error) {
    next(error);
  }
};

//
exports.deleteuser = async (req, res, next) => {
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

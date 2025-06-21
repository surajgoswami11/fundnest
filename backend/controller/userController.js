const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/token");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const createError = require("http-errors");

exports.getUser = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).select("-password");

    if (!user) return next(createError(404, "User not found"));

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.uploadKyc = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      phoneNumber,
      email,
      accountHolderName,
      bankName,
      IFSC,
      accountNo,
      panNo,
      aadharNo,
    } = req.body;

    if (
      !req.files ||
      !req.files.passbookImage ||
      !req.files.aadharImage ||
      !req.files.panImage
    ) {
      return next(createError(404, "Please upload documents"));
    }

    const kycData = await KYC.create({
      user: userId,
      phoneNumber,
      email,
      accountHolderName,
      bankName,
      IFSC,
      accountNo,
      panNo,
      aadharNo,
      passbookImage: passbookImage.secure_url,
      aadharImage: aadharImage.secure_url,
      panImage: panImage.secure_url,
    });

    await User.findByIdAndUpdate(userId, { kycStatus: "pending" });

    res.status(201).json({
      success: true,
      message: "KYC uploaded successfully",
      kyc: kycData,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contactNumber, userName } = req.body;

    let profile = "";

    if (req.file) {
      const upProfile = await uploadOnCloudinary(req.file.buffer);
      profile = upProfile.secure_url;
    }

    const updateFile = {
      contactNumber,
      userName,
    };

    if (profile) {
      updateFile.profile = profile;
    }

    const updateUser = await User.findByIdAndUpdate(id);
    if (!updateUser) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({ success: true, user: updateUser });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User Not Found"));
    }

    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

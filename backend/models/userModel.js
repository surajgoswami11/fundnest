const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be atleast 6 charcters long"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    kycStatus: {
      type: String,
      enum: ["pending", "resolve", "reject"],
      default: "pending",
    },
    googleId: String,
    facebookId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

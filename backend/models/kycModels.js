const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
    trim: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  IFSC: {
    type: String,
    required: true,
    trim: true,
  },
  accountNo: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  panNo: {
    type: String,
    required: true,
    trim: true,
    minlength: [12, "Please provide correct PAN Number"],
    maxlength: [12, "Please provide correct PAN Number"],
  },
  aadharNo: {
    type: Number,
    required: true,
    trim: true,
    minlength: [12, "Please provide correct PAN Number"],
    maxlength: [12, "Please provide correct PAN Number"],
  },
  passbookImage: {
    type: String,
    required: true,
  },
  aadharImage: {
    type: String,
    required: true,
  },
  panImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("KYC", kycSchema);

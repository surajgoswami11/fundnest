const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
  }
};

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// image uplaod
exports.uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    if (fs.unlinkSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
};

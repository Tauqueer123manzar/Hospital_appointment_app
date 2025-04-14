const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'raw',
      folder: 'prescriptions',
    });

    fs.unlinkSync(localFilePath); // delete after upload
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath); // delete if error
    throw error;
  }
};

module.exports = uploadToCloudinary;

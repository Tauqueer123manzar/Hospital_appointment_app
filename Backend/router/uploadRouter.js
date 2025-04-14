const express = require("express");
const multer = require("multer");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp folder

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  try {
    const pdfUrl = await uploadToCloudinary(req.file.path);
    res.status(200).json({ success: true, url: pdfUrl });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const router = express.Router();

// Multer configuration - allow only PDF files
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);  // Ye check karo ki file upload ho rahi hai ya nahi
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

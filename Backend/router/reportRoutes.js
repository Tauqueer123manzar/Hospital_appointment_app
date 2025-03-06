const express = require("express");
const { generateReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/generate-report", generateReport);

module.exports = router;

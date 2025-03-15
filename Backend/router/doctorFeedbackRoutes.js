const express = require("express");
const { isAdminAuthenticated } = require("../middlewares/auth");
const { submitFeedback, getAllFeedbacks, deleteFeedback } = require("../controllers/doctorFeedbackController");

const router = express.Router();

router.post("/submit", submitFeedback, isAdminAuthenticated);
router.get("/getall", getAllFeedbacks, isAdminAuthenticated);
router.delete("/delete/:id", deleteFeedback);

module.exports = router;

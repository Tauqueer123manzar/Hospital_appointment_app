const express = require("express");
const { isAdminAuthenticated,isDoctorAuthenticated } = require("../middlewares/auth");
const { submitFeedback, getAllFeedbacks, deleteFeedback,getDoctorFeedbacks} = require("../controllers/doctorFeedbackController");

const router = express.Router();

router.post("/submit", submitFeedback, isAdminAuthenticated);
router.get("/getall", getAllFeedbacks, isAdminAuthenticated);
router.delete("/delete/:id", deleteFeedback);
router.get("/doctor/feedback/:id", getDoctorFeedbacks, isDoctorAuthenticated);


module.exports = router;

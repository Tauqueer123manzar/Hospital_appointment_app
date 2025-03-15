const express=require("express");
const {submitFeedback}=require("../controllers/doctorFeedbackController");

const router=express.Router();

router.post("/submit",submitFeedback);

module.exports=router;
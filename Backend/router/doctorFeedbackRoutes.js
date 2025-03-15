const express=require("express");
const {isAdminAuthenticated}=require("../middlewares/auth");
const {submitFeedback,getAllFeebacks,deleteFeedback}=require("../controllers/doctorFeedbackController");

const router=express.Router();

router.post("/submit",submitFeedback,isAdminAuthenticated);
router.get("/getll",getAllFeebacks);
router.delete("/delete/:id",deleteFeedback);
module.exports=router;
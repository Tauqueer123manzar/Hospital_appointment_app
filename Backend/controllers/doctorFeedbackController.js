const DoctorFeedback=require("../models/Feebdackmodel");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors");
const User=require("../models/UserSchema");
const { get } = require("mongoose");
exports.submitFeedback=catchAsyncErrors(async(req,res,next)=>{
    try {
        const {patientName,doctorId,rating,feedback}=req.body;
        
        //validate rating
        if(rating<1 || rating>5){
            return res.status(400).json({
                success:false,
                message:"Rating must be between 1 to 5"
            })
        }

        // check if doctor exists
        const doctorExists=await User.findById(doctorId);
        if(!doctorExists){
            return res.status(400).json({
                success:false,
                message:"Doctor not found"
            });
        }

        //create new feedback entry
        const feedbackEntry=new DoctorFeedback({
            patientName,
            doctorId,
            rating,
            feedback
        });

        await feedbackEntry.save();
        res.status(200).json({
            success:true,
            message:"Feedback submitted successfully"
        })

    } catch (error) {
       res.status(500).json({
           success:false,
           message:"Internal Server Error"
       }) 
    }
});

// ===================================== get all feedbacks ==============================
exports.getAllFeedbacks=catchAsyncErrors(async(req,res,next)=>{
    try {
        const feedbacks = await Feedback.find().populate("doctorId", "firstName lastName");
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching feedback" });
    }
});


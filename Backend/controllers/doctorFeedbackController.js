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
exports.getAllFeebacks=catchAsyncErrors(async(req,res,next)=>{
    const feedbacks=await DoctorFeedback.find();
    res.status(200).json({
        success:true,
        feedbacks
    });
});


// ================================== delete feedback ==============================
exports.deleteFeedback=catchAsyncErrors(async(req,res,next)=>{
        const {id}=req.params;
        const feedback=await DoctorFeedback.findByIdAndDelete(id);

        if(!feedback){
            return res.status(404).json({
                success:false,
                message:"Feedback not found"
            });
        }
       res.status(200).json({
           success:true,
           message:"Feedback deleted successfully"
       });
});




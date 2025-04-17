const DoctorFeedback = require("../models/Feebdackmodel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/UserSchema");

exports.submitFeedback = catchAsyncErrors(async(req, res, next) => {
    try {
        const {patientName, doctorId, rating, feedback} = req.body;
        
        if(rating < 1 || rating > 5){
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 to 5"
            });
        }
        
        const doctorExists = await User.findById(doctorId);
        if(!doctorExists){
            return res.status(400).json({
                success: false,
                message: "Doctor not found"
            });
        }
        
        const feedbackEntry = new DoctorFeedback({
            patientName,
            doctorId,
            rating,
            feedback
        });
        
        await feedbackEntry.save();
        res.status(200).json({
            success: true,
            message: "Feedback submitted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Get all feedbacks with populated doctor information
exports.getAllFeedbacks = catchAsyncErrors(async(req, res, next) => {
    const feedbacks = await DoctorFeedback.find().populate({
        path: 'doctorId',
        select: 'firstname lastname email role'
    });
    
    res.status(200).json({
        success: true,
        feedbacks
    });
});

// Delete feedback
exports.deleteFeedback = catchAsyncErrors(async(req, res, next) => {
    const {id} = req.params;
    const feedback = await DoctorFeedback.findByIdAndDelete(id);
    
    if(!feedback){
        return res.status(404).json({
            success: false,
            message: "Feedback not found"
        });
    }
    
    res.status(200).json({
        success: true,
        message: "Feedback deleted successfully"
    });
});

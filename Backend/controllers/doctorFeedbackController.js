const DoctorFeedback = require("../models/Feebdackmodel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/UserSchema");
const ErrorHandler=require("../middlewares/Errorhandler");

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

// ==================================== specific doctor feedback ============================
exports.getDoctorFeedbacks = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        // Attempt to find user by ID
        const user = await User.findById(id);

        if (!user) {
            return next(new ErrorHandler("Doctor not found!", 404));
        }

        if (!user._id) {
            return next(new ErrorHandler("Doctor's ID is missing!", 400));
        }

        // Find feedbacks associated with the doctor's _id
        const feedbacks = await DoctorFeedback.find({ doctorId: user._id });

        if (!feedbacks.length) {
            return res.status(200).json({
                success: true,
                message: "No feedbacks found for this doctor.",
            });
        }

        return res.status(200).json({
            success: true,
            feedbacks,
        });
    } catch (error) {
        console.error("Error fetching doctor feedbacks:", error);
        return next(new ErrorHandler("Internal Server Error", 500));
    }
});



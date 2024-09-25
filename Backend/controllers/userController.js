// PatientRegister.js
const User = require("../models/UserSchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/Errorhandler"); // Correct the import path here

const PatientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        pincode,
        dob,
        gender,
        password,
        role,
    } = req.body;

    if (
        !firstname ||
        !lastname ||
        !email ||
        !phone ||
        !pincode ||
        !dob ||
        !gender ||
        !password ||
        !role
    ) {
        return next(new ErrorHandler("Please fill the full form", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("Already registered", 400));
    }

    user = await User.create({
        firstname,
        lastname,
        email,
        phone,
        pincode,
        dob,
        gender,
        password,
        role,
    });

    res.status(200).json({
        success: true,
        message: "User Registered Successfully",
    });
});

module.exports = PatientRegister;

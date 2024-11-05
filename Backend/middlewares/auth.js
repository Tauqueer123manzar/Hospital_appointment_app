const ErrorHandler = require("../middlewares/Errorhandler");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/UserSchema");

exports.isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Admin Token: ", token);
    if (!token) {
        return next(new ErrorHandler("Admin not Authenticated", 400));
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded JWT: ", decoded);
    
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Admin") {
            return next(new ErrorHandler(`${req.user.role} not Authorized for this resources!`, 403));
        }
        next();
    }catch(error){
        return next(new ErrorHandler("Inavlid token or authentication failed",400));
    }
});

exports.isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    console.log("Patient Token: ", req.cookies.patientToken);
    if (!token) {
        return next(new ErrorHandler("Patinet not Authenticated", 400));
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded JWT: ", decoded);
    
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Patient") {
            return next(new ErrorHandler(`${req.user.role} not Authorized for this resources!`, 403));
        }
        next();
    }catch(error){
        return next(new ErrorHandler("Invalid token or authentication failed",400));
    }
});



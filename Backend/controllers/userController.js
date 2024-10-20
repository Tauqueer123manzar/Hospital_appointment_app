const User = require("../models/UserSchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/Errorhandler");
const { GenerateToken } = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
// ==================================== Patient Register ============================================
exports.PatientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstname, lastname, email, phone, gender, password, role, } = req.body;

    if (!firstname || !lastname || !email || !phone || !gender || !password || !role
    ) {
        return next(new ErrorHandler("Please fill the full form", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("Already registered", 400));
    }

    user = await User.create({ firstname, lastname, email, phone, gender, password, role, });
    GenerateToken(user, "User Registered Successfully", 200, res);
});
// ============================================= Login ====================================================
exports.loginRegister = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide all details!", 400));
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and ConfirmPassword Do not Match!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid password or Email!", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid password or Email", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found!", 400));
    }
    GenerateToken(user, "User Login Successfully", 200, res)
});

//   ======================================= Add new Admin =================================================
exports.addnewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstname, lastname, email, phone, gender, password } = req.body;
    if (!firstname || !lastname || !email || !phone || !gender || !password) {
        return next(new ErrorHandler("Please fill the full form", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
    }
    const user = await User.create({ firstname, lastname, email, phone, gender, password, role: "Admin" });
    res.status(200).json({
        success: true,
        message: "New Admin Added Successfully"
    });
});


// ================================= Get All Doctors ==========================================
exports.getallDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    });
});

// ===================================== Get user Details ================================
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

// ====================================== Admin Logout ===================================
exports.adminLogout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("adminToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Admin Logged Out Successfully",
    });
});

// ===================================== Patient Logout =======================================
exports.patientLogout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("patientToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Patient Logged Out Successfullt"
    });
});

// ==================================== Add new Doctor ============================================
exports.addnewDoctor = catchAsyncErrors(async (req, res, next) => {
    // Check if a file is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;

    // Allowed formats for avatar
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported!", 400));
    }

    const { firstname, lastname, email, phone, gender, password, doctordepartment } = req.body;

    if (!firstname || !lastname || !email || !phone || !gender || !password || !doctordepartment) {
        return next(new ErrorHandler("Please provide all required details", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }

    // Upload avatar to Cloudinary
    let cloudinaryResponse;
    try {
        cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath, {
            folder: "avatars",
        });
    } catch (error) {
        console.error("Cloudinary Error:", error);
        return next(new ErrorHandler("Failed to upload avatar", 500));
    }

    // Ensure that the response is valid
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(new ErrorHandler("Failed to upload avatar", 500));
    }

    // Create doctor in the database
    const doctor = await User.create({
        firstname,
        lastname,
        email,
        phone,
        gender,
        password,
        doctordepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    // Send success response
    res.status(200).json({
        success: true,
        message: "Doctor Added Successfully",
        doctor
    });
});


const User = require("../models/UserSchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/Errorhandler");
const { GenerateToken } = require("../utils/jwtToken");
const Errorhandler = require("../middlewares/Errorhandler");

// ==================================== Patient Register ============================================
exports.PatientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        gender,
        password,
        role,
    } = req.body;

    if (
        !firstname ||
        !lastname ||
        !email ||
        !phone ||
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
        gender,
        password,
        role,
    });
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
exports.addnewadmin = catchAsyncErrors(async (req, res, next) => {
    const { firstname, lastname, email, phone, pincode, dob, gender, password,role} = req.body;
    if (
        !firstname ||
        !lastname ||
        !email ||
        !phone ||
        !gender ||
        !password
        ) {
          return next(new Errorhandler("please fill the form",400));
    }
    
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new Errorhandler("Admin this email already registered",400));
    }

    const admin= await User.create({
        firstname,
        lastname,
        email,
        phone,
        gender,
        password,
        role:"Admin"
    });
    res.status(200).json({
        success:true,
        message:"Admin added successfully",
    });
    
});

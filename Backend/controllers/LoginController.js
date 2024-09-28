const catchAsyncErrors=require("../middlewares/catchAsyncErrors");
const User=require("../models/UserSchema");
const ErrorHandler=require("../middlewares/Errormiddleware");
const login=catchAsyncErrors(async(req,res,next)=>{
    const{email,password,confirmPassword,role}=req.body;
    if(!email || !password || !confirmPassword ||!role){
        return next(new ErrorHandler("Please Provide all details!",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and ConfirmPassword Do not Match!",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid password or Email!",400));
    }
    const ispasswordMatched=await user.confirmPassword(password);
    if(!ispasswordMatched){
        return next(new ErrorHandler("Invalid password or Email",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found!",400));
    }
    res.status(200).json({
        success:true,
        message:"User Logged In Successfully",
    });
});

module.exports=login;
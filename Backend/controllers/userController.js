const User = require("../models/Usermessage");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Errorhandler = require("../middlewares/Errormiddleware");
const PatientReister = catchAsyncErrors(async (req, res, next) => {
    const {
        FirstName,
        LastName,
        Email,
        Phone,
        Pincode,
        Dob,
        Gender,
        Password,
        role,
    } = req.body;
    if (
        !FirstName ||
        !LastName ||
        !Email ||
        !Phone ||
        !Pincode ||
        !Dob ||
        !Gender ||
        !Password ||
        !role) {
        return next(new Errorhandler("Please fill the full form", 400));
    }
    let user = await User.findOne({ Email });
    if(user){
        return next(new Errorhandler("Already registered!", 400));
    }
    user = await User.create({
        FirstName,
        LastName,
        Email,
        Phone,
        Pincode,
        Dob,
        Gender,
        Password,
        role,
    });
    res.status(200).json({
        sucess: true,
        message: "User Registered Sucessfully"
    });
});
module.exports = PatientReister;

const login=catchAsyncErrors(async(req,res,next)=>{
    const{Email,Password,confirmPassword,role}=req.body;
    if(!Email || !Password || !confirmPassword || !role){
        return next(new Errorhandler("Please Provide all details",400));
    };
    if(Password !== confirmPassword){
        return next(new Errorhandler("Password and Confirm password Do Not Matched",400));
    }
    const user= await User.findOne({Email}).select('+Password');
    if(!user){
        return next(new Errorhandler("Invalid Password or Email",400));
    }
    const isconfirmPassword=await user.confirmPassword();
    if(!isconfirmPassword){
        return next(new Errorhandler("Invalid Password or Email",400));
    }
    if(role !== user.role){
        return next(new Errorhandler("User with this role not Found!",400));
    }
    res.status(200).json({
        sucess:true,
        message:"User Logged in sucessfully",
    });
});

module.exports=login;
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
        message: "Registeration sucessfully"
    });
});
module.exports = PatientReister;
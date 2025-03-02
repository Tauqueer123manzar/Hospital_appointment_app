const Message=require("../models/message");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors");
const Errorhandler=require("../middlewares/Errorhandler");
const mongoose=require("mongoose");
// ====================================== Send Message ================================
exports.sendmessage=catchAsyncErrors(async(req,res,next)=>{
    const{firstname,lastname,email,phonenumber,message}=req.body;
    if(!firstname || !lastname ||!email || !phonenumber ||!message){
        return next(new Errorhandler("Please fill full form",400));
    }
    try{
        await Message.create({firstname,lastname,email,phonenumber,message});
        res.status(200).json({
            success:true,
            message:"Message sent successfully",
        });
    }catch(error){
        next(error);
    }
});

// ======================================= Get All Messages ===============================================
exports.getallMessages= catchAsyncErrors(async(req,res,next)=>{
    const messages=await Message.find();
    res.status(200).json({
        success:true,
        messages
    });
});

// ====================================== message delete =========================================
exports.deleteMessage = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
        return next(new Errorhandler("Message not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Message deleted successfully",
    });
});
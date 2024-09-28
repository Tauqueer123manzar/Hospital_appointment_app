const Message=require("../models/message");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors");
const Errorhandler=require("../middlewares/Errorhandler");
const sendmessage=catchAsyncErrors(async(req,res,next)=>{
    const{firstname,lastname,email,phonenumber,message}=req.body;
    if(!firstname || !lastname ||!email || !phonenumber ||!message){
        return next(new Errorhandler("Please fill full form",400));
    }
    try{
        await Message.create({firstname,lastname,email,phonenumber,message});
        res.status(200).json({
            success:true,
            message:"Message sent successfully"
        });
    }catch(error){
        next(error);
    }
});
module.exports=sendmessage;
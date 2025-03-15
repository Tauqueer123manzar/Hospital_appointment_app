const mongoose=require("mongoose");

const FeedbackSchema=new mongoose.Schema({
    patientName:{
        type:String,
        required:true
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    feedback:{
        type:String,
        required:true
    }      
},{timestamps:true});

module.exports=mongoose.model("Feedback",FeedbackSchema);
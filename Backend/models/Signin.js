const mongoose = require("mongoose");

const UserSchema= new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Confirm_password:{
        type:String,
        required:true
    }
});

const User= mongoose.model("User",UserSchema);
module.exports=User;
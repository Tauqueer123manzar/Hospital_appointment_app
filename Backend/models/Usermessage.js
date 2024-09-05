const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const JsonWebToken=require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        MinLength: [3, "FirstName must be contain at least 3 characters long"],
    },

    LastName: {
        type: String,
        required: true,
        MinLength: [3, "LastName must be contain at least 3 characters long"]
    },
    Email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide a Valid Email"],
    },
    Phone:{
        type:Number,
        required:true,
        MinLength:[10,"Minimum Length should be 10 charcaters"],
    },
    Pincode:{
        type:Number,
        required:true,
    },
    Dob:{
        type:Date,
        required:[true,"DOB is required"],
    },
    Gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    Password:{
        type:String,
        required:true,
        MinLength:[11,"Minimum Length should be 11 charcaters"],
        Select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    doctordepartment:{
        type:String,
    },
    docAvtar:{
       public_id:String,
       url:String,
    }
    
});

// Hash the password before saving the user document
UserSchema.pre("save",async function(next){
    if(!this.isModified(`Password`)){
        next();
    }
    const salt= await bcrypt.genSalt(10);
    this.Password=await bcrypt.hash(this.Password,salt);
    next();
})

UserSchema.methods.comparePassword=async function(enteredpassword){
   return await bcrypt.compare(enteredpassword,this.Password);
};

UserSchema.methods.generateJsonWebToken=async function(){
  return JsonWebToken.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
  });
}

const User= mongoose.model("User",UserSchema);

module.exports=User;
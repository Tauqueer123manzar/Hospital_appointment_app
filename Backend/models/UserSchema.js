const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const JsonWebToken=require("jsonwebtoken");

// const UserSchema = new mongoose.Schema({
//     firstname: {
//         type: String,
//         required: true,
//         MinLength: [3, "FirstName must be contain at least 3 characters long"],
//     },

//     lastname: {
//         type: String,
//         required: true,
//         MinLength: [3, "LastName must be contain at least 3 characters long"]
//     },
//     email:{
//         type:String,
//         required:true,
//         validate:[validator.isEmail,"Please Provide a Valid Email"],
//     },
//     phone:{
//         type:String,
//         required:true,
//         MinLength:[10,"Minimum Length should be 10 charcaters"],
//         MaxLength:[11,"Maximum Length Should be 11 characters"],
//     },
//     pincode:{
//         type:Number,
//         required:true,
//     },
//     dob:{
//         type:Date,
//         required:[true,"DOB is required"],
//     },
//     gender:{
//         type:String,
//         required:true,
//         enum:["Male","Female"],
//     },
//     password:{
//         type:String,
//         required:true,
//         MinLength:[11,"Minimum Length should be 11 charcaters"],
//         select:false,
//     },
//     role:{
//         type:String,
//         required:true,
//         enum:["Admin","Patient","Doctor"],
//     },
//     doctordepartment:{
//         type:String,
//     },
//     docAvtar:{
//        public_id:String,
//        url:String,
//     }
    
// });

// // Hash the password before saving the user document
// UserSchema.pre("save",async function(next){
//     if(!this.isModified("password")){
//         next();
//     }
//     const salt= await bcrypt.genSalt(10);
//     this.password=await bcrypt.hash(this.password,salt);
//     next();
// })

// UserSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
 
// UserSchema.methods.generateJsonWebToken=async function(){
//   return JsonWebToken.sign({id:this._id},process.env.JWT_SECRET_KEY,{
//         expiresIn:process.env.JWT_EXPIRES,
//   });
// };


// const User= mongoose.model("User",UserSchema);

// module.exports=User;
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: [3, "FirstName must contain at least 3 characters"],
    },
    lastname: {
        type: String,
        required: true,
        minlength: [3, "LastName must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, "Minimum Length should be 10 characters"],
        maxlength: [11, "Maximum Length should be 11 characters"],
    },
    pincode: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        required: true,
        minlength: [11, "Minimum Length should be 11 characters"],
        select: false, // Don't return password by default
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctordepartment: {
        type: String,
    },
    docAvtar: {
        public_id: String,
        url: String,
    }
});

// Hash the password before saving the user document
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Corrected to `this.password`
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token method
UserSchema.methods.generateJsonWebToken = async function () {
    return JsonWebToken.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

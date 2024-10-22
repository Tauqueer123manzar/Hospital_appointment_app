const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const validator = require("validator");
const jwt=require("jsonwebtoken");

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
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "Minimum Length should be 5 characters"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctordepartment: {
        type: String,
    },
    docAvatar: {
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
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token method
UserSchema.methods.generateJsonWebToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};


const User = mongoose.model("User", UserSchema);
module.exports = User;

const mongoose = require('mongoose');
const validator = require('validator');

const MessageSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: [3, "Firstname must be at least 3 characters long"],
    },
    lastname: {
        type: String,
        required: true,
        minLength: [3, "Lastname must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phonenumber: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be at least 10 characters long"],
        maxLength: [11, "Phone number can be at most 11 characters long"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must be at least 10 characters long"],
        maxLength: [1000, "Message can be at most 1000 characters long"],
    }
},{timestamps:true});
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;

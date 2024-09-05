const mongoose = require('mongoose');
const validator = require('validator');

const MessageSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
        minLength: [3, "Firstname must be at least 3 characters long"],
    },
    Lastname: {
        type: String,
        required: true,
        minLength: [3, "Lastname must be at least 3 characters long"],
    },
    Email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    Phonenumber: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be at least 10 characters long"],
        maxLength: [11, "Phone number can be at most 11 characters long"],
    },
    Message: {
        type: String,
        required: true,
        minLength: [10, "Message must be at least 10 characters long"],
        maxLength: [1000, "Message can be at most 1000 characters long"],
    }
});
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
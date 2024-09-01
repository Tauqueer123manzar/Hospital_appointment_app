const Message = require('../models/message');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Errorhandler = require("../middlewares/Errormiddleware");
const sendmessage = catchAsyncErrors(async (req, res, next) => {
    const { Firstname, Lastname, Email, Phonenumber, Message: userMessage } = req.body;

    if (!Firstname || !Lastname || !Email || !Phonenumber || !userMessage) {
        return next(new Errorhandler("please fill the full form", 400));
    }
    try {
        await Message.create({ Firstname, Lastname, Email, Phonenumber, Message: userMessage });
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        next(error); 
    }
});

module.exports = sendmessage;

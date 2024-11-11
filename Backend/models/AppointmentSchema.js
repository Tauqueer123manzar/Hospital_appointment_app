const mongoose = require("mongoose");
const User = require("../models/UserSchema");

const AppointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true 
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    hasvisited:{
        type:Boolean,
        default:false
    },
   doctorName:{
       type:String,
       required:true
   },
    selectTime: {
        type: String,
        required: true,
        trim: true,
        enum:["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM"]
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index:true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index:true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
}, { timestamps: true });

AppointmentSchema.index({appointmentDate:1});
const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;

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
    selectDay: {
        type: String,
        required: true,
        trim: true
    },
    selectDoctor: {
        doctorName:{
            type:String,
            required:true
        }
    },
    selectTime: {
        type: String,
        required: true,
        trim: true
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;

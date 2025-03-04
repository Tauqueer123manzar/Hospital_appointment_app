const mongoose = require("mongoose");
const validator = require("validator");

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be at least 10 characters"],
        maxLength: [12, "Phone number can be at most 12 characters"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
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
    hasVisited: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;

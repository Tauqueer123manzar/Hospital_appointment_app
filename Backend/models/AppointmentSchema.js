const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        minLength: [10, "Phone number must be at least 10 characters"],
        maxLength: [12, "Phone number can be at most 12 characters"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: String
    },
    appointment_time: {
        type: String,
        validate: {
            validator: function (v) {
                return /^((0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)|([01]\d|2[0-3]):[0-5]\d)$/i.test(v);
            },
            message: props => `${props.value} is not a valid time! Use format like "10:00 AM" or "14:30".`
        }
    },
    department: {
        type: String
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
        ref: "User"
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
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

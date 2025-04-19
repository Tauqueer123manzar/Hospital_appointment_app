const mongoose = require("mongoose");
const Appointment = require("../models/AppointmentSchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/Errorhandler");
const User = require("../models/UserSchema");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });


// =========================== POST APPOINTMENT ===========================
exports.postAppointment = catchAsyncErrors(async (req, res, next) => {
    try {
        const {
            patientName, phone, gender, appointment_date, department, appointment_time,
            doctor_firstName, doctor_lastName, hasVisited
        } = req.body;

        // Debugging Request Data
        console.log("Received Appointment Request:", req.body);

        // Validate Required Fields
        if (!patientName || !phone || !gender || !appointment_date || !appointment_time || !department || !doctor_firstName || !doctor_lastName) {
            return next(new ErrorHandler("Missing required fields", 400));
        }

        // Find Doctor in DB
        const isConflict = await User.findOne({
            firstname: doctor_firstName.trim(),
            lastname: doctor_lastName.trim(),
            role: "Doctor",
            doctordepartment: department.trim()
        });

        if (!isConflict) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found in this department!"
            });
        }

        const patientId = req.user._id;
        const doctorId = isConflict._id;

        // Create New Appointment
        const appointment = await Appointment.create({
            patientName,
            phone,
            gender,
            appointment_date,
            appointment_time,
            department,
            doctor: {
                firstName: doctor_firstName,
                lastName: doctor_lastName
            },
            hasVisited,
            doctorId,
            patientId
        });

        res.status(201).json({
            success: true,
            message: "Appointment Created Successfully!",
            appointment
        });

    } catch (error) {
        console.error("Error Creating Appointment:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// =============================== get all appointments ==========================
exports.getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(201).json({
        success: true,
        appointments
    });
});


// ============================ get appointment by id ===========================
exports.getAllAppointmentsById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 400));
    }
    res.status(200).json({
        success: true,
        appointment
    });
});

// ================================== update appointment status ======================================
exports.updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 400));
    }
    appointment.status = status;
    await appointment.save();
    res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        appointment
    });
});

// ====================================== getall confirmed appointments ==============================
exports.getAllConfirmedAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({ status: "Accepted" });

        if (!appointments) {
            return res.status(404).json({
                success: false,
                message: "No confirmed appointments found",
            });
        }

        res.status(200).json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.error("Error fetching confirmed appointments:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ========================================= Doctor All Appointents ========================================
 exports.getDoctorAllAppointments = async (req, res, next) => {
    try {
        const user = req.user;
        console.log("user: ", user);
        const appointments = await Appointment.find({
            doctorId: user._id
        })

        if (!appointments) {
            return res.status(404).json({
                success: false,
                message: "No confirmed appointments found",
            });
        }
        return res.status(200).json({
            success: true,
            message:"Appointments fetched successfully",
            data: appointments
        })
    } catch (error) {
        console.log("something went wrong:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error?.message
        })
    }
}

// ======================================= Doctor Confirmed Appointments ==================================
exports.getDoctorAllConfirmedAppointments = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    const appointments = await Appointment.find({
      doctorId: user._id,
      status: "Accepted",
    });
  
    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  });
  


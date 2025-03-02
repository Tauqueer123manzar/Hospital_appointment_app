const mongoose=require("mongoose");
const Appointment=require("../models/AppointmentSchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/Errorhandler");
const User=require("../models/UserSchema");
const { GenerateToken } = require("../utils/jwtToken");

// =========================== create a new appointment ================================================
exports.createAppointment=catchAsyncErrors(async(req,res,next)=>{
    try {
        const {patientName,specialization,appointmentDate,doctorName,selectTime,doctorId,patientId}=req.body;
        if(!patientName || !specialization || !appointmentDate || !doctorName || !selectTime || !doctorId || !patientId){
            return next(new ErrorHandler("Missing required fields",400));
        }

        const newAppointment=new Appointment({
            patientName,
            specialization,
            appointmentDate,
            hasVisited:false,
            doctorName,
            selectTime,
            doctorId,
            patientId,
            status:"Pending"
        });

        const savedAppointment=await newAppointment.save();
        res.status(201).json({
            message:"Appointment Created Sucessfully",
            appointment:savedAppointment
        });
    } catch (error) {
        res.status(500).json({
            message:"Error in creating appointment",error
        });
    }
})


// ================================= Get All Appointments ==================================================================
exports.getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    try {
        const appointments=await Appointment.find();
        res.status(200).json({
            appointments
        })
    } catch (error) {
        res.status(500).json({
            message:"Error fetching appointments",error
        });
    }
});


// ==================================== Get appointment by Id =============================================================
exports.getAppointmentById=catchAsyncErrors(async(req,res,next)=>{
    try {
        const appointment=await Appointment.findById(req.params.id);
        if(!appointment){
            return next(new ErrorHandler("Appointment not found",400));
        }
        res.status(200).json({
            appointment
        })
    } catch (error) {
        res.status(500).json({
            message:"Error fetching appointment",error
        });
    }
});

// ===================================== update appointment status by Id ================================================
exports.updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    try {
        const {status}=req.body;
        const validStatus=["Pending","Accepted","Rejected"];
        if(!validStatus.includes(status)){
            return next(new ErrorHandler("Invalid Status value",400));
        }
        const appointment=await Appointment.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}
        );

        if(!appointment){
            return next(new ErrorHandler("Appointment not found",400));
        }
        res.status(200).json({
            message:"Appointment status updated successfully",
            appointment
        });

    } catch (error) {
        res.status(500).json({
            message:"Error updating appointment status",error
        });
    }
});


// ==================================== delete appointment by Id ===============================================
exports.deleteAppointmentById=catchAsyncErrors(async(req,res,next)=>{
    try {
        const appointment=await Appointment.findByIdAndDelete(req.params.id);
        if(!appointment){
            return next(new ErrorHandler("Appointment not found",400));
        }
        res.status(200).json({
            message:"Appointment deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error deleting appointment",error
        });
    }
});


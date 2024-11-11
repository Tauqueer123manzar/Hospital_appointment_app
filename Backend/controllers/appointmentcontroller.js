const mongoose=require("mongoose");
const Appointment=require("../models/AppointmentSchema");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/Errorhandler");
const { GenerateToken } = require("../utils/jwtToken");

// =========================== create a new appointment ================================================
exports.createAppointment=catchAsyncErrors(async(req,res,next)=>{
    try {
        const {patientName,specialization,appointmentDate,hasVisited,doctorName,selectTime,doctorId,patientId,status}=req.body;
        if(!patientName || !specialization || !appointmentDate || !doctorName || !selectTime || !doctorId || !patientId){
            return next(new ErrorHandler("Missing required fields",400));
        }

        const newAppointment=new Appointment({
            patientName,
            specialization,
            appointmentDate,
            hasVisited:hasVisited||false,
            doctorName,
            selectTime,
            doctorId,
            patientId,
            status:status || "Pending"
        });

        const savedAppointment=await newAppointment.save();
        res.status(201).json({
            message:"Appointment Created Sucessfully",appointment:savedAppointment
        });
    } catch (error) {
        res.status(500).json({
            message:"Error in creating appointment",error
        });
    }
})
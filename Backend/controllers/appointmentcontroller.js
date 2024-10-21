const Appointment=require("../models/AppointmentSchema");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors");
const ErrorHandler=require("../middlewares/Errorhandler");

exports.sendAppointment=catchAsyncErrors(async(req,res,next)=>{
    const{patientName,specialization,appointmentDate,selectDoctor,selectDay,hasvisited,selectTime}=req.body;

    if(!patientName || !specialization || !appointmentDate || !selectDoctor || !selectDay || !selectTime){
        return next(new ErrorHandler("please fill full form",400));
    }
    const isconflict=await Appointment.findOne({
        selectDoctor:doctorId,
        role:"Doctor",
        doctorDepartment:specialization
    });
    if(!isconflict){
        return next(new ErrorHandler("Doctor not available",400));
    }
   try{
      await Appointment.create({patientName,specialization,appointmentDate,selectDoctor,selectDay,selectTime,hasvisited,doctorId,patientId});
      res.status(200).json({
         success:true,
         message:"Appointment sent successfully"
      });  
   }catch(error){
     console.log(error);
     next(error);
   }
})
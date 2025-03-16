const Appointment=require("../models/AppointmentSchema");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors");
// ========================================= Get Report ================================
exports.getReport=catchAsyncErrors(async(req,res,next)=>{
  const appointments=await Appointment.find({status:"Accepted"});
  res.status(200).json({
    success:true,
    appointments
  });
});


// ================================== date wise report ================================
exports.dateWiseReport = catchAsyncErrors(async (req, res, next) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({ success: false, message: "Date is required" });
  }

  // MongoDB me string ya Date format check karne ke liye query modify karo:
  const appointments = await Appointment.find({
    $or: [{ date: date }, { date: new Date(date) }]
  });

  if (appointments.length === 0) {
    return res.status(404).json({ success: false, message: "No appointments found for this date" });
  }

console.log("Requested Date:", date);
console.log("Appointments Found:", appointments);


  res.status(200).json({
    success: true,
    appointments,
  });
});



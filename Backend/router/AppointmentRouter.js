// const express=require("express");
// const {createAppointment, getAllAppointments, getAppointmentById, updateAppointmentStatus, deleteAppointmentById}=require("../controllers/appointmentcontroller");
// const {isAdminAuthenticated,isPatientAuthenticated}=require("../middlewares/auth");
// const router=express.Router();


// router.post("/create",isPatientAuthenticated,createAppointment);
// router.get("/getall",isAdminAuthenticated,getAllAppointments);
// router.get("/getall:id",isAdminAuthenticated,getAppointmentById);
// router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus);
// router.delete("/delete/:id",isAdminAuthenticated,deleteAppointmentById);
// module.exports=router;
const express = require("express");
const { postAppointment } = require("../controllers/appointmentcontroller");
const { isPatientAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// POST: Create Appointment
router.post("/post", isPatientAuthenticated, postAppointment);

module.exports = router;



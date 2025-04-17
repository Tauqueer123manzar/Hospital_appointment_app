const express = require("express");
const { postAppointment, getAllAppointments, updateAppointmentStatus, getAllConfirmedAppointments} = require("../controllers/appointmentcontroller");
const { isPatientAuthenticated, isAdminAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// POST: Create Appointment
router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall",getAllAppointments,isAdminAuthenticated);
router.get("/getall:id",getAllAppointments,isAdminAuthenticated);
router.put("/appointments/:id/status", updateAppointmentStatus);
router.get("/confirmed",getAllConfirmedAppointments);
module.exports = router;

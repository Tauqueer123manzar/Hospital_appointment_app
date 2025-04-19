const { getDoctorAllAppointments,getDoctorAllConfirmedAppointments} = require("../controllers/appointmentcontroller");
const { PatientRegister, loginRegister, addnewAdmin, getallDoctors, getUserDetails,
    getDoctorTotalAppointments, getDoctorConfirmedAppointments, getDoctorRejectedAppointments, getDoctorPendingAppointments,
    adminLogout, patientLogout, addnewDoctor, DoctorRegister, getDoctorById, getallUsers, getMyProfile, updatePrescription, getDoctorProfileById, 
    getDoctorAppointments} = require("../controllers/userController");

const {isPatientAuthenticated,isAdminAuthenticated,isDoctorAuthenticated}=require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.post("/patient/register", PatientRegister);
router.get("/getallusers", getallUsers);
router.post("/login", loginRegister);
router.post("/admin/addnew", isAdminAuthenticated, addnewAdmin);
router.get("/doctors", getallDoctors);
router.get("/doctors/:id", getDoctorById);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, adminLogout);
router.get("/patient/logout", isPatientAuthenticated, patientLogout);
router.post("/doctor/addnew", isAdminAuthenticated, addnewDoctor);
router.post("/register", DoctorRegister);
router.put("/update-prescription", isPatientAuthenticated, updatePrescription);
router.get('/me', isPatientAuthenticated, getMyProfile);
router.get("/getdoctor/:id", getDoctorProfileById);
router.get("/doctor/:id/appointments", getDoctorTotalAppointments);
router.get("/doctor/:id/appointments/confirmed", getDoctorConfirmedAppointments);
router.get("/doctor/:id/appointments/pending", getDoctorPendingAppointments);
router.get("/doctor/:id/appointments/rejected", getDoctorRejectedAppointments);
router.get('/doctor/appointment/all',isDoctorAuthenticated,getDoctorAllAppointments)
router.get('/doctor/appointment/confirmed',isDoctorAuthenticated,getDoctorAllConfirmedAppointments)


// router.get("/me",getMyProfile);
module.exports = router

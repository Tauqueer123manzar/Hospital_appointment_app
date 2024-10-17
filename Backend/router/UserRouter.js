const {PatientRegister,loginRegister,addnewAdmin, getallDoctors, getUserDetails, adminLogout, patientLogout} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const {isAdminAuthenticated,isPatientAuthenticated}=require("../middlewares/auth");

router.post("/patient/register", PatientRegister);
router.post("/login",loginRegister);
router.post("/admin/addnew",isAdminAuthenticated,addnewAdmin);
router.get("/doctors",getallDoctors);
router.get("/admin/me",isAdminAuthenticated,getUserDetails);
router.get("/patient/me",isPatientAuthenticated,getUserDetails);
router.get("/admin/logout",isAdminAuthenticated,adminLogout);
router.get("/patient/logout",isPatientAuthenticated,patientLogout);

module.exports = router

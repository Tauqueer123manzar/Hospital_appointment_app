const {PatientRegister,loginRegister,addnewAdmin} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const {isAdminAuthenticated,isPatientAuthenticated}=require("../middlewares/auth");

router.post("/patient/register", PatientRegister);
router.post("/login",loginRegister);
router.post("/admin/addnew",isAdminAuthenticated,addnewAdmin);

module.exports = router

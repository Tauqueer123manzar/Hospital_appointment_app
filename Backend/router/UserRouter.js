const {PatientRegister,loginRegister,addnewadmin} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/patient/register", PatientRegister);
router.post("/login",loginRegister);
router.post("/admin/addnew",addnewadmin);

module.exports = router

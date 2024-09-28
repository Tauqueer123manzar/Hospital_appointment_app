const {PatientRegister,loginRegister} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/patient/register", PatientRegister);
router.post("/login",loginRegister);
module.exports = router

const PatientRegister = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/patient/register", PatientRegister);

module.exports = router

const login = require("../controllers/userController");
const PatientRegister = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/patient/register", PatientRegister);
router.post("/login",login);
module.exports = router

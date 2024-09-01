const PatientReister = require("../controllers/userController");
const express=require("express");

const router=express.Router();
router.post("/patient/register",PatientReister);

module.exports=router;
const login = require("../controllers/userController");
const PatientReister = require("../controllers/userController");
const express=require("express");

const router=express.Router();
router.post("/patient/register",PatientReister);
router.post("/login",login);

module.exports=router;
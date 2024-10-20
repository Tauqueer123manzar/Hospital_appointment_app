const express=require("express");
const {sendAppointment}=require("../controllers/appointmentcontroller");

const router=express.Router();

router.post("/send",sendAppointment);

module.exports=router;
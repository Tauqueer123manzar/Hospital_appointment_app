const express=require("express");
const {createAppointment}=require("../controllers/appointmentcontroller");

const router=express.Router();

router.post("/create",createAppointment);

module.exports=router;
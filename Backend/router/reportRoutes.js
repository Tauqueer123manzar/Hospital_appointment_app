const express=require("express");
const {getReport,dateWiseReport}=require("../controllers/reportController");

const router=express.Router();

router.get("/getreport",getReport);

router.get("/getreport/:date",dateWiseReport);

module.exports=router;



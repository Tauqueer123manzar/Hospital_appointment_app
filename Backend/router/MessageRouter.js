const express = require("express");
const {sendmessage,getallMessages} = require("../controllers/messagecontroller");
const {isAdminAuthenticated}=require("../middlewares/auth");
const router = express.Router();

router.post("/send", sendmessage);
router.get("/getall", isAdminAuthenticated,getallMessages)
module.exports = router;

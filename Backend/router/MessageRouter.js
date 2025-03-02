const express = require("express");
const {sendmessage,getallMessages,deleteMessage} = require("../controllers/messagecontroller");
const {isAdminAuthenticated}=require("../middlewares/auth");
const router = express.Router();

router.post("/send", sendmessage);
router.delete("/delete/:id", isAdminAuthenticated,deleteMessage);
router.get("/getall", isAdminAuthenticated,getallMessages)
module.exports = router;

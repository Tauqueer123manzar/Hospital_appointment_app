const express = require("express");
const sendmessage = require("../controllers/messagecontroller");

const router = express.Router();

router.post("/send", sendmessage);

module.exports = router;

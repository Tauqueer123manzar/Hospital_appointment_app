const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const MessageRouter = require("./router/MessageRouter");
const connectDb = require("./database/dbconnection");
const Errormiddleware=require("./middlewares/Errormiddleware");
const UserRouter= require("./router/UserRouter");
const AppointmentRouter=require("./router/AppointmentRouter");
dotenv.config({ path: "./config/.env" });
const router=express.Router();
const app = express();

// Middleware setup
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/appointment",AppointmentRouter);
app.use(Errormiddleware);

  
module.exports = app;
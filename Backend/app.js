const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MessageRouter = require("./router/MessageRouter");
const fileUpload=require("express-fileupload");
const Errormiddleware=require("./middlewares/Errormiddleware");
const UserRouter= require("./router/UserRouter");
const AppointmentRouter=require("./router/AppointmentRouter");
const doctorFeedbackRouter=require("./router/doctorFeedbackRoutes");
const reportRoutes=require("./router/reportRoutes");
const connectDb=require('./database/dbconnection');
const router=express.Router();
dotenv.config({ path: "./config/.env" });
const app = express();

// Middleware setup
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// Routes
app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/appointment",AppointmentRouter);
app.use("/api/v1/feedback",doctorFeedbackRouter);
app.use("/api/reports", reportRoutes);
app.use(Errormiddleware);

  
module.exports = app;
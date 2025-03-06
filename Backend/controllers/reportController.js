const fs = require("fs");
const PDFDocument = require("pdfkit");
const cloudinary = require("cloudinary").v2;
const Appointment = require("../models/AppointmentSchema");

// Report Generate Controller
const generateReport = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    if (appointments.length === 0) {
      return res.status(400).json({ message: "No appointments found" });
    }

    // PDF Create
    const doc = new PDFDocument();
    const filePath = "report.pdf";
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(18).text("Doctor Appointment Report", { align: "center" });
    doc.moveDown();

    appointments.forEach((appt, index) => {
      doc.fontSize(12).text(
        `${index + 1}. Patient: ${appt.patientName}, Doctor: ${appt.doctorName}, Date: ${appt.date}`
      );
      doc.moveDown();
    });

    doc.end();

    writeStream.on("finish", async () => {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: "raw",
        });

        fs.unlinkSync(filePath); // Local file delete karna

        res.json({ message: "Report generated successfully", url: result.url });
      } catch (uploadError) {
        console.error(uploadError);
        res.status(500).json({ message: "Error uploading report" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating report" });
  }
};

module.exports = { generateReport };

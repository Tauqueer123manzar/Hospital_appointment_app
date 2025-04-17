// // import React, { useState, useEffect } from 'react';
// // import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
// // import Footer from '../components/Footer';
// // import Topbar from '../components/Topbar';
// // import appointment from '../assets/appointment page.png';
// // import { toast } from 'react-toastify';
// // import axios from 'axios';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';
// // import 'jspdf/dist/polyfills.es.js';
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // const Appointment = () => {
// //   const [patientName, setPatientName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [appointmentDate, setAppointmentDate] = useState("");
// //   const [timeSlot, setTimeSlot] = useState("");
// //   const [department, setDepartment] = useState("");
// //   const [doctor, setDoctor] = useState("");
// //   const [hasVisited, setHasVisited] = useState(false);
// //   const [doctors, setDoctors] = useState([]);
// //   const [savedAppointment, setSavedAppointment] = useState(null);
// //   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

// //   const token = localStorage.getItem("token");

// //   const departmentsArray = [
// //     "Cardiology",
// //     "Dermatology",
// //     "Orthopedics",
// //     "Neurology",
// //     "Oncology",
// //     "Radiology",
// //     "Physical Therapy",
// //     "Pediatrics",
// //     "ENT"
// //   ];

// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         const { data } = await axios.get("http://localhost:8080/api/v1/user/doctors", {
// //           headers: { "Content-Type": "application/json" }
// //         });
// //         setDoctors(data.doctors);
// //       } catch (error) {
// //         toast.error("Failed to load doctors");
// //       }
// //     };
// //     fetchDoctors();
// //   }, []);

// //   const handleAppointment = async (e) => {
// //     e.preventDefault();
    
// //     if (!doctor) {
// //       toast.error("Please select a doctor.");
// //       return;
// //     }

// //     const selectedDoctor = doctors.find(doc => `${doc.firstname} ${doc.lastname}` === doctor);

// //     if (!selectedDoctor || selectedDoctor.doctordepartment !== department) {
// //       toast.error("Doctor not found in this department.");
// //       return;
// //     }

// //     try {
// //       const { data } = await axios.post("http://localhost:8080/api/v1/appointment/post",
// //         {
// //           patientName,
// //           phone,
// //           gender,
// //           appointment_time: timeSlot,
// //           appointment_date: appointmentDate,
// //           department,
// //           doctor_firstName: selectedDoctor.firstname,
// //           doctor_lastName: selectedDoctor.lastname,
// //           hasVisited
// //         },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       toast.success(data.message);
      
// //       // Save appointment data for PDF generation
// //       setSavedAppointment({
// //         patientName,
// //         phone,
// //         gender,
// //         appointment_time: timeSlot,
// //         appointment_date: appointmentDate,
// //         department,
// //         doctor_firstName: selectedDoctor.firstname,
// //         doctor_lastName: selectedDoctor.lastname,
// //         hasVisited
// //       });
      
// //       // Clear form after successful submission
// //       setPatientName("");
// //       setPhone("");
// //       setGender("");
// //       setTimeSlot("");
// //       setAppointmentDate("");
// //       setDepartment("");
// //       setDoctor("");
// //       setHasVisited(false);

// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Error booking appointment");
// //     }
// //   };

// //   // Function to generate and download PDF
// //   const generatePDF = async () => {
// //     if (!savedAppointment) {
// //       toast.error("No appointment data available");
// //       return;
// //     }
    
// //     setIsGeneratingPDF(true);
    
// //     try {
// //       // Create new PDF document with encoding for better text support
// //       const doc = new jsPDF({
// //         orientation: 'portrait',
// //         unit: 'mm',
// //         format: 'a4',
// //         putOnlyUsedFonts: true
// //       });
      
// //       // Define page dimensions
// //       const pageWidth = doc.internal.pageSize.getWidth();
// //       const pageHeight = doc.internal.pageSize.getHeight();
      
// //       // Add header with EasyCare branding
// //       doc.setFillColor(22, 160, 133); // Green header
// //       doc.rect(0, 0, pageWidth, 40, 'F');
      
// //       // Add hospital name
// //       doc.setFontSize(24);
// //       doc.setTextColor(255, 255, 255); // White text
// //       doc.setFont('helvetica', 'bold');
// //       doc.text('EasyCare Hospital', pageWidth / 2, 20, { align: 'center' });
      
// //       // Add appointment confirmation title
// //       doc.setFillColor(240, 240, 240); // Light gray background
// //       doc.rect(0, 40, pageWidth, 20, 'F');
      
// //       doc.setFontSize(18);
// //       doc.setTextColor(22, 160, 133); // Green text
// //       doc.setFont('helvetica', 'bold');
// //       doc.text('Appointment Confirmation', pageWidth / 2, 55, { align: 'center' });
      
// //       // Add appointment message
// //       doc.setFontSize(12);
// //       doc.setTextColor(80, 80, 80); // Dark gray text
// //       doc.setFont('helvetica', 'normal');
// //       doc.text('Your appointment has been successfully booked.', pageWidth / 2, 70, { align: 'center' });
      
// //       // Format date for better readability
// //       const formatDate = (dateString) => {
// //         const date = new Date(dateString);
// //         return date.toLocaleDateString('en-US', { 
// //           weekday: 'long',
// //           year: 'numeric', 
// //           month: 'long', 
// //           day: 'numeric' 
// //         });
// //       };
      
// //       // Patient information section
// //       doc.setDrawColor(200, 200, 200); // Light gray border
// //       doc.setLineWidth(0.5);
// //       doc.roundedRect(15, 80, pageWidth - 30, 80, 3, 3, 'S');
      
// //       // Left column
// //       doc.setFontSize(12);
// //       doc.setTextColor(60, 60, 60);
// //       doc.setFont('helvetica', 'bold');
// //       doc.text('Patient:', 25, 95);
// //       doc.text('Phone:', 25, 110);
// //       doc.text('Gender:', 25, 125);
      
// //       doc.setFont('helvetica', 'normal');
// //       doc.text(savedAppointment.patientName, 70, 95);
// //       doc.text(savedAppointment.phone, 70, 110);
// //       doc.text(savedAppointment.gender, 70, 125);
      
// //       // Right column
// //       doc.setFont('helvetica', 'bold');
// //       doc.text('Date:', pageWidth/2 + 10, 95);
// //       doc.text('Department:', pageWidth/2 + 10, 110);
// //       doc.text('Doctor:', pageWidth/2 + 10, 125);
      
// //       doc.setFont('helvetica', 'normal');
// //       doc.text(formatDate(savedAppointment.appointment_date), pageWidth/2 + 50, 95);
// //       doc.text(savedAppointment.department, pageWidth/2 + 50, 110);
// //       doc.text(`Dr. ${savedAppointment.doctor_firstName} ${savedAppointment.doctor_lastName}`, pageWidth/2 + 50, 125);
      
// //       // Previous visit status
// //       doc.setFont('helvetica', 'bold');
// //       doc.text('Previous Visit:', 25, 140);
// //       doc.setFont('helvetica', 'normal');
// //       doc.text(savedAppointment.hasVisited ? 'Yes' : 'No', 70, 140);
      
// //       // Add information box
// //       doc.setFillColor(245, 245, 245);
// //       doc.roundedRect(15, 170, pageWidth - 30, 70, 3, 3, 'FD');
      
// //       doc.setFontSize(14);
// //       doc.setTextColor(22, 160, 133);
// //       doc.setFont('helvetica', 'bold');
// //       doc.text('Important Information', 25, 185);
      
// //       doc.setFontSize(10);
// //       doc.setTextColor(80, 80, 80);
// //       doc.setFont('helvetica', 'normal');
// //       doc.text('• Please arrive 15 minutes before your scheduled appointment time.', 25, 200);
// //       doc.text('• Bring your ID and insurance card (if applicable).', 25, 210);
// //       doc.text('• If you need to cancel or reschedule, please contact us at least 24 hours in advance.', 25, 220);
// //       doc.text('• Contact us at: +1-555-EASYCARE for any questions.', 25, 230);
      
// //       // Footer
// //       doc.setDrawColor(22, 160, 133);
// //       doc.setLineWidth(1);
// //       doc.line(15, pageHeight - 30, pageWidth - 15, pageHeight - 30);
      
// //       doc.setFontSize(10);
// //       doc.setTextColor(80, 80, 80);
// //       doc.text('EasyCare Hospital', 15, pageHeight - 20);
// //       doc.text('123 Healing Street, Healthcare City', 15, pageHeight - 15);
// //       doc.text('www.easycare.com', 15, pageHeight - 10);
      
// //       // Add appointment ID on the bottom right
// //       const appointmentId = `A${Math.floor(Math.random() * 10000)}`;
// //       doc.setFont('helvetica', 'bold');
// //       doc.text(`Appointment ID: ${appointmentId}`, pageWidth - 15, pageHeight - 15, { align: 'right' });
      
// //       // Save the PDF - using promise-based approach for browser compatibility
// //       const pdfBlob = doc.output('blob');
// //       const pdfUrl = URL.createObjectURL(pdfBlob);
      
// //       // Create an invisible link and trigger download
// //       const link = document.createElement('a');
// //       link.href = pdfUrl;
// //       link.download = `EasyCare_Appointment_${savedAppointment.patientName.replace(/\s+/g, '_')}.pdf`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
      
// //       toast.success("Appointment PDF downloaded successfully");
// //     } catch (error) {
// //       console.error("PDF generation error:", error);
// //       toast.error("Error generating PDF. Please try again.");
// //     } finally {
// //       setIsGeneratingPDF(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <Topbar />
// //       <Container fluid className="p-0">
// //         {/* Banner Section */}
// //         <div className="appointment-banner position-relative">
// //           <img src={appointment} alt="Appointment Banner" className="w-100 img-fluid" style={{ height: '50vh', objectFit: 'cover' }} />
// //           <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
// //             <h1 className="text-white">Book an Appointment</h1>
// //             <p className="text-white">Book an appointment with our experienced doctors in just a few clicks.</p>
// //           </div>
// //         </div>

// //         {/* Form Section */}
// //         <Container className="my-5">
// //           <Row className="justify-content-center">
// //             <Col xs={12} md={8} lg={6}>
// //               {!savedAppointment ? (
// //                 <Card className="shadow-lg p-4 rounded bg-light">
// //                   <h3 className="text-center mb-4">Book an Appointment</h3>
// //                   <Form onSubmit={handleAppointment}>
// //                     <Form.Group controlId="patientName" className="mb-3">
// //                       <Form.Label>Patient Name</Form.Label>
// //                       <Form.Control type="text" placeholder="Enter your name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
// //                     </Form.Group>

// //                     <Form.Group controlId="timeSlot" className="mb-3">
// //                       <Form.Label>Time Slot</Form.Label>
// //                       <Form.Select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
// //                         <option value="">Select Time Slot</option>
// //                         <option value="10:00 AM">10:00 AM</option>
// //                         <option value="11:00 AM">11:00 AM</option>
// //                         <option value="12:00 PM">12:00 PM</option>
// //                         <option value="01:00 PM">01:00 PM</option>
// //                         <option value="02:00 PM">02:00 PM</option>
// //                         <option value="03:00 PM">03:00 PM</option>
// //                         <option value="04:00 PM">04:00 PM</option>
// //                         <option value="05:00 PM">05:00 PM</option>
// //                         <option value="06:00 PM">06:00 PM</option>
// //                         <option value="07:00 PM">07:00 PM</option>
// //                         <option value="08:00 PM">08:00 PM</option>
// //                       </Form.Select>
// //                     </Form.Group>

// //                     <Form.Group className="mb-3">
// //                     <Form.Label>Appointment Date</Form.Label>
// //                     <br></br>
// //                     <DatePicker
// //                       selected={appointmentDate}
// //                       onChange={(date) => setAppointmentDate(date)}
// //                       className="form-control"
// //                       dateFormat="yyyy-MM-dd"
// //                       minDate={new Date()}
// //                       placeholderText='Select a date'
// //                       showPopperArrow={false}
// //                       isClearable
// //                       popperPlacement="bottom"
// //                       popperModifiers={[
// //                         {
// //                           name: "preventOverflow",
// //                           options: {
// //                             padding: 10,
// //                           },
// //                         },
// //                       ]}
// //                       popperClassName="react-datepicker-popper"
// //                       required
// //                     />
// //                   </Form.Group>

// //                     <Form.Group controlId="phone" className="mb-3">
// //                       <Form.Label>Phone</Form.Label>
// //                       <Form.Control type="text" value={phone} placeholder='Enter your phone' onChange={(e) => setPhone(e.target.value)} required />
// //                     </Form.Group>

// //                     <Form.Group controlId="gender" className="mb-3">
// //                       <Form.Label>Gender</Form.Label>
// //                       <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
// //                         <option value="">Select Gender</option>
// //                         <option value="Male">Male</option>
// //                         <option value="Female">Female</option>
// //                         <option value="Other">Other</option>
// //                       </Form.Select>
// //                     </Form.Group>

// //                     <Form.Group controlId="department" className="mb-3">
// //                       <Form.Label>Department</Form.Label>
// //                       <Form.Select value={department} onChange={(e) => { setDepartment(e.target.value); setDoctor(""); }} required>
// //                         <option value="">Select Department</option>
// //                         {departmentsArray.map((dept, idx) => (
// //                           <option key={idx} value={dept}>{dept}</option>
// //                         ))}
// //                       </Form.Select>
// //                     </Form.Group>

// //                     <Form.Group controlId="doctor" className="mb-3">
// //                       <Form.Label>Doctor</Form.Label>
// //                       <Form.Select value={doctor} onChange={(e) => setDoctor(e.target.value)} disabled={!department} required>
// //                         <option value="">Select Doctor</option>
// //                         {doctors
// //                           .filter(doc => doc.doctordepartment === department)
// //                           .map((doc, idx) => (
// //                             <option key={idx} value={`${doc.firstname} ${doc.lastname}`}>
// //                               {doc.firstname} {doc.lastname}
// //                             </option>
// //                           ))}
// //                       </Form.Select>
// //                     </Form.Group>

// //                     <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
// //                       <Form.Label className="mb-0">Have you visited before?</Form.Label>
// //                       <Form.Check type="checkbox" checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} />
// //                     </Form.Group>

// //                     <Button type="submit" className="mt-3 w-100 btn-primary">GET APPOINTMENT</Button>
// //                   </Form>
// //                 </Card>
// //               ) : (
// //                 <Card className="shadow-lg p-4 rounded">
// //                   <div className="text-center mb-4">
// //                     <h2 className="text-success">Appointment Confirmed!</h2>
// //                     <p className="text-muted">Your appointment has been successfully booked.</p>
// //                   </div>
                  
// //                   <Row className="mb-4">
// //                     <Col xs={12} md={6} className="mb-3">
// //                       <p><strong>Patient:</strong> {savedAppointment.patientName}</p>
// //                       <p><strong>Phone:</strong> {savedAppointment.phone}</p>
// //                       <p><strong>Gender:</strong> {savedAppointment.gender}</p>
// //                       <p><strong>Time:</strong> {savedAppointment.appointment_time}</p>
// //                     </Col>
// //                     <Col xs={12} md={6} className="mb-3">
// //                       <p><strong>Date:</strong> {new Date(savedAppointment.appointment_date).toLocaleDateString()}</p>
// //                       <p><strong>Department:</strong> {savedAppointment.department}</p>
// //                       <p><strong>Doctor:</strong> Dr. {savedAppointment.doctor_firstName} {savedAppointment.doctor_lastName}</p>
// //                     </Col>
// //                   </Row>
                  
// //                   <div className="d-flex justify-content-center mb-3">
// //                     <Button 
// //                       variant="success" 
// //                       onClick={generatePDF} 
// //                       disabled={isGeneratingPDF}
// //                       style={{ backgroundColor: '#16a085', borderColor: '#16a085' }}
// //                       className="p-2 px-4"
// //                     >
// //                       {isGeneratingPDF ? (
// //                         <>
// //                           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
// //                           Generating PDF...
// //                         </>
// //                       ) : (
// //                         <>Download Appointment PDF</>
// //                       )}
// //                     </Button>
// //                   </div>
                  
// //                   <div className="d-flex justify-content-center">
// //                     <Button 
// //                       variant="outline-primary" 
// //                       onClick={() => setSavedAppointment(null)}
// //                       className="p-2 px-4"
// //                     >
// //                       Book Another Appointment
// //                     </Button>
// //                   </div>
// //                 </Card>
// //               )}
// //             </Col>
// //           </Row>
// //         </Container>

// //         <Footer />
// //       </Container>
// //     </>
// //   );
// // };

// // export default Appointment;


// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
// import Footer from '../components/Footer';
// import Topbar from '../components/Topbar';
// import appointment from '../assets/appointment page.png';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import 'jspdf/dist/polyfills.es.js';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Appointment = () => {
//   const [patientName, setPatientName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [department, setDepartment] = useState("");
//   const [doctor, setDoctor] = useState("");
//   const [hasVisited, setHasVisited] = useState(false);
//   const [doctors, setDoctors] = useState([]);
//   const [savedAppointment, setSavedAppointment] = useState(null);
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//   const token = localStorage.getItem("token");

//   const departmentsArray = [
//     "Cardiology", "Dermatology", "Orthopedics", "Neurology",
//     "Oncology", "Radiology", "Physical Therapy", "Pediatrics", "ENT"
//   ];

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8080/api/v1/user/doctors", {
//           headers: { "Content-Type": "application/json" }
//         });
//         setDoctors(data.doctors);
//       } catch (error) {
//         toast.error("Failed to load doctors");
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleAppointment = async (e) => {
//     e.preventDefault();

//     if (!doctor) {
//       toast.error("Please select a doctor.");
//       return;
//     }

//     const selectedDoctor = doctors.find(doc => `${doc.firstname} ${doc.lastname}` === doctor);

//     if (!selectedDoctor || selectedDoctor.doctordepartment !== department) {
//       toast.error("Doctor not found in this department.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:8080/api/v1/appointment/post", {
//         patientName, phone, gender,
//         appointment_time: timeSlot,
//         appointment_date: appointmentDate,
//         department,
//         doctor_firstName: selectedDoctor.firstname,
//         doctor_lastName: selectedDoctor.lastname,
//         hasVisited
//       }, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       });

//       toast.success(data.message);
//       setSavedAppointment({
//         patientName, phone, gender,
//         appointment_time: timeSlot,
//         appointment_date: appointmentDate,
//         department,
//         doctor_firstName: selectedDoctor.firstname,
//         doctor_lastName: selectedDoctor.lastname,
//         hasVisited
//       });

//       // Clear form
//       setPatientName(""); setPhone(""); setGender("");
//       setTimeSlot(""); setAppointmentDate(""); setDepartment("");
//       setDoctor(""); setHasVisited(false);

//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error booking appointment");
//     }
//   };

//   const generatePDF = () => {
//     if (!savedAppointment) {
//       toast.error("No appointment data available");
//       return;
//     }

//     setIsGeneratingPDF(true);

//     try {
//       const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();

//       doc.setFillColor(22, 160, 133);
//       doc.rect(0, 0, pageWidth, 40, 'F');
//       doc.setFontSize(24);
//       doc.setTextColor(255, 255, 255);
//       doc.setFont('helvetica', 'bold');
//       doc.text('EasyCare Hospital', pageWidth / 2, 20, { align: 'center' });

//       doc.setFillColor(240, 240, 240);
//       doc.rect(0, 40, pageWidth, 20, 'F');
//       doc.setFontSize(18);
//       doc.setTextColor(22, 160, 133);
//       doc.text('Appointment Confirmation', pageWidth / 2, 55, { align: 'center' });

//       doc.setFontSize(12);
//       doc.setTextColor(80, 80, 80);
//       doc.setFont('helvetica', 'normal');
//       doc.text('Your appointment has been successfully booked.', pageWidth / 2, 70, { align: 'center' });

//       const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//           weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//         });
//       };

//       doc.setDrawColor(200, 200, 200);
//       doc.roundedRect(15, 80, pageWidth - 30, 80, 3, 3, 'S');

//       doc.setFontSize(12);
//       doc.setTextColor(60, 60, 60);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Patient:', 25, 95);
//       doc.text('Phone:', 25, 110);
//       doc.text('Gender:', 25, 125);

//       doc.setFont('helvetica', 'normal');
//       doc.text(savedAppointment.patientName, 70, 95);
//       doc.text(savedAppointment.phone, 70, 110);
//       doc.text(savedAppointment.gender, 70, 125);

//       doc.setFont('helvetica', 'bold');
//       doc.text('Date:', pageWidth / 2 + 10, 95);
//       doc.text('Department:', pageWidth / 2 + 10, 110);
//       doc.text('Doctor:', pageWidth / 2 + 10, 125);

//       doc.setFont('helvetica', 'normal');
//       doc.text(formatDate(savedAppointment.appointment_date), pageWidth / 2 + 50, 95);
//       doc.text(savedAppointment.department, pageWidth / 2 + 50, 110);
//       doc.text(`Dr. ${savedAppointment.doctor_firstName} ${savedAppointment.doctor_lastName}`, pageWidth / 2 + 50, 125);

//       doc.setFont('helvetica', 'bold');
//       doc.text('Previous Visit:', 25, 140);
//       doc.setFont('helvetica', 'normal');
//       doc.text(savedAppointment.hasVisited ? 'Yes' : 'No', 70, 140);

//       doc.setFillColor(245, 245, 245);
//       doc.roundedRect(15, 170, pageWidth - 30, 70, 3, 3, 'FD');
//       doc.setFontSize(14);
//       doc.setTextColor(22, 160, 133);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Important Information', 25, 185);

//       doc.setFontSize(10);
//       doc.setTextColor(80, 80, 80);
//       doc.setFont('helvetica', 'normal');
//       doc.text('• Please arrive 15 minutes before your scheduled appointment time.', 25, 200);
//       doc.text('• Bring your ID and insurance card (if applicable).', 25, 210);
//       doc.text('• If you need to cancel or reschedule, please contact us at least 24 hours in advance.', 25, 220);
//       doc.text('• Contact us at: +1-555-EASYCARE for any questions.', 25, 230);

//       doc.setDrawColor(22, 160, 133);
//       doc.line(15, pageHeight - 30, pageWidth - 15, pageHeight - 30);
//       doc.setFontSize(10);
//       doc.setTextColor(80, 80, 80);
//       doc.text('EasyCare Hospital', 15, pageHeight - 20);
//       doc.text('123 Healing Street, Healthcare City', 15, pageHeight - 15);
//       doc.text('www.easycare.com', 15, pageHeight - 10);

//       const appointmentId = `A${Math.floor(Math.random() * 10000)}`;
//       doc.setFont('helvetica', 'bold');
//       doc.text(`Appointment ID: ${appointmentId}`, pageWidth - 15, pageHeight - 15, { align: 'right' });

//       const pdfBlob = doc.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       const link = document.createElement('a');
//       link.href = pdfUrl;
//       link.download = `EasyCare_Appointment_${savedAppointment.patientName.replace(/\s+/g, '_')}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.success("Appointment PDF downloaded successfully");
//     } catch (error) {
//       toast.error("Error generating PDF. Please try again.");
//     } finally {
//       setIsGeneratingPDF(false);
//     }
//   };

//   return (
//     <>
//       <Topbar />
//       <Container fluid className="p-0">
//         <div className="appointment-banner position-relative">
//           <img src={appointment} alt="Appointment Banner" className="w-100 img-fluid" style={{ height: '50vh', objectFit: 'cover' }} />
//           <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
//             <h1 className="text-white">Book an Appointment</h1>
//             <p className="text-white">Book an appointment with our experienced doctors in just a few clicks.</p>
//           </div>
//         </div>

//         <Container className="my-5">
//           <Card className="p-4 shadow">
//             <Form onSubmit={handleAppointment}>
//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Patient Name</Form.Label>
//                     <Form.Control type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Phone</Form.Label>
//                     <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Gender</Form.Label>
//                     <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Department</Form.Label>
//                     <Form.Select value={department} onChange={(e) => setDepartment(e.target.value)} required>
//                       <option value="">Select</option>
//                       {departmentsArray.map((dep, index) => (
//                         <option key={index} value={dep}>{dep}</option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Doctor</Form.Label>
//                     <Form.Select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
//                       <option value="">Select</option>
//                       {doctors
//                         .filter(doc => doc.doctordepartment === department)
//                         .map((doc, index) => (
//                           <option key={index}>{`${doc.firstname} ${doc.lastname}`}</option>
//                         ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Appointment Date</Form.Label>
//                     <DatePicker
//                       selected={appointmentDate}
//                       onChange={(date) => setAppointmentDate(date)}
//                       className="form-control"
//                       dateFormat="yyyy-MM-dd"
//                       minDate={new Date()}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Time Slot</Form.Label>
//                     <Form.Control type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mt-4">
//                     <Form.Check
//                       type="checkbox"
//                       label="Visited before?"
//                       checked={hasVisited}
//                       onChange={(e) => setHasVisited(e.target.checked)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <div className="d-flex justify-content-between mt-4">
//                 <Button variant="success" type="submit">Book Appointment</Button>
//                 <Button variant="info" onClick={generatePDF} disabled={!savedAppointment || isGeneratingPDF}>
//                   {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
//                 </Button>
//               </div>
//             </Form>
//           </Card>
//         </Container>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default Appointment;


import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import appointment from '../assets/appointment page.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'jspdf/dist/polyfills.es.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [savedAppointment, setSavedAppointment] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  // New state to store existing appointments
  const [existingAppointments, setExistingAppointments] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const token = localStorage.getItem("token");

  const departmentsArray = [
    "Cardiology", "Dermatology", "Orthopedics", "Neurology",
    "Oncology", "Radiology", "Physical Therapy", "Pediatrics", "ENT"
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/user/doctors", {
          headers: { "Content-Type": "application/json" }
        });
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
    
    // Fetch existing appointments
    fetchExistingAppointments();
  }, []);

  // Function to fetch existing appointments
  const fetchExistingAppointments = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/appointment/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setExistingAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error fetching existing appointments:", error);
      // Don't show error to user as this is a background operation
    }
  };

  // Function to check if the selected time slot is available
  const isTimeSlotAvailable = (doctorFirstName, doctorLastName, date, time) => {
    // Format the selected date to YYYY-MM-DD for comparison
    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    // Check if there's any existing appointment with the same doctor, date and time
    const conflict = existingAppointments.find(apt => {
      const aptDate = new Date(apt.appointment_date).toISOString().split('T')[0];
      return (
        apt.doctor_firstName === doctorFirstName &&
        apt.doctor_lastName === doctorLastName &&
        aptDate === formattedDate &&
        apt.appointment_time === time
      );
    });
    
    return !conflict; // Return true if no conflict found
  };

  // Function to handle date, doctor or time slot change
  const checkAvailability = async () => {
    if (!doctor || !appointmentDate || !timeSlot) return;
    
    setIsCheckingAvailability(true);
    
    try {
      // Refresh appointments list to get the latest data
      await fetchExistingAppointments();
      
      const selectedDoctor = doctors.find(doc => `${doc.firstname} ${doc.lastname}` === doctor);
      
      if (selectedDoctor) {
        const isAvailable = isTimeSlotAvailable(
          selectedDoctor.firstname,
          selectedDoctor.lastname,
          appointmentDate,
          timeSlot
        );
        
        if (!isAvailable) {
          toast.warning("This time slot is already booked with this doctor. Please select another time or date.");
        }
      }
    } catch (error) {
      console.error("Error checking availability:", error);
    } finally {
      setIsCheckingAvailability(false);
    }
  };
  
  // Call checkAvailability when doctor, date or time changes
  useEffect(() => {
    if (doctor && appointmentDate && timeSlot) {
      checkAvailability();
    }
  }, [doctor, appointmentDate, timeSlot]);

  const handleAppointment = async (e) => {
    e.preventDefault();

    if (!doctor) {
      toast.error("Please select a doctor.");
      return;
    }

    const selectedDoctor = doctors.find(doc => `${doc.firstname} ${doc.lastname}` === doctor);

    if (!selectedDoctor || selectedDoctor.doctordepartment !== department) {
      toast.error("Doctor not found in this department.");
      return;
    }
    
    // Check if the time slot is available before proceeding
    const isAvailable = isTimeSlotAvailable(
      selectedDoctor.firstname,
      selectedDoctor.lastname,
      appointmentDate,
      timeSlot
    );
    
    if (!isAvailable) {
      toast.error("This time slot is already booked. Please select another time.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/appointment/post", {
        patientName, phone, gender,
        appointment_time: timeSlot,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: selectedDoctor.firstname,
        doctor_lastName: selectedDoctor.lastname,
        hasVisited
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(data.message);
      
      // Add the new appointment to our local state to prevent double booking without refreshing
      setExistingAppointments([...existingAppointments, {
        patientName,
        phone,
        gender,
        appointment_time: timeSlot,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: selectedDoctor.firstname,
        doctor_lastName: selectedDoctor.lastname,
        hasVisited
      }]);
      
      setSavedAppointment({
        patientName, phone, gender,
        appointment_time: timeSlot,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: selectedDoctor.firstname,
        doctor_lastName: selectedDoctor.lastname,
        hasVisited
      });

      // Clear form
      setPatientName(""); setPhone(""); setGender("");
      setTimeSlot(""); setAppointmentDate(""); setDepartment("");
      setDoctor(""); setHasVisited(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking appointment");
    }
  };

  const generatePDF = () => {
    if (!savedAppointment) {
      toast.error("No appointment data available");
      return;
    }

    setIsGeneratingPDF(true);

    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setFillColor(22, 160, 133);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setFontSize(24);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text('EasyCare Hospital', pageWidth / 2, 20, { align: 'center' });

      doc.setFillColor(240, 240, 240);
      doc.rect(0, 40, pageWidth, 20, 'F');
      doc.setFontSize(18);
      doc.setTextColor(22, 160, 133);
      doc.text('Appointment Confirmation', pageWidth / 2, 55, { align: 'center' });

      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.text('Your appointment has been successfully booked.', pageWidth / 2, 70, { align: 'center' });

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
      };

      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(15, 80, pageWidth - 30, 80, 3, 3, 'S');

      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'bold');
      doc.text('Patient:', 25, 95);
      doc.text('Phone:', 25, 110);
      doc.text('Gender:', 25, 125);

      doc.setFont('helvetica', 'normal');
      doc.text(savedAppointment.patientName, 70, 95);
      doc.text(savedAppointment.phone, 70, 110);
      doc.text(savedAppointment.gender, 70, 125);

      doc.setFont('helvetica', 'bold');
      doc.text('Date:', pageWidth / 2 + 10, 95);
      doc.text('Department:', pageWidth / 2 + 10, 110);
      doc.text('Doctor:', pageWidth / 2 + 10, 125);

      doc.setFont('helvetica', 'normal');
      doc.text(formatDate(savedAppointment.appointment_date), pageWidth / 2 + 50, 95);
      doc.text(savedAppointment.department, pageWidth / 2 + 50, 110);
      doc.text(`Dr. ${savedAppointment.doctor_firstName} ${savedAppointment.doctor_lastName}`, pageWidth / 2 + 50, 125);

      doc.setFont('helvetica', 'bold');
      doc.text('Previous Visit:', 25, 140);
      doc.setFont('helvetica', 'normal');
      doc.text(savedAppointment.hasVisited ? 'Yes' : 'No', 70, 140);

      doc.setFillColor(245, 245, 245);
      doc.roundedRect(15, 170, pageWidth - 30, 70, 3, 3, 'FD');
      doc.setFontSize(14);
      doc.setTextColor(22, 160, 133);
      doc.setFont('helvetica', 'bold');
      doc.text('Important Information', 25, 185);

      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.text('• Please arrive 15 minutes before your scheduled appointment time.', 25, 200);
      doc.text('• Bring your ID and insurance card (if applicable).', 25, 210);
      doc.text('• If you need to cancel or reschedule, please contact us at least 24 hours in advance.', 25, 220);
      doc.text('• Contact us at: +1-555-EASYCARE for any questions.', 25, 230);

      doc.setDrawColor(22, 160, 133);
      doc.line(15, pageHeight - 30, pageWidth - 15, pageHeight - 30);
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text('EasyCare Hospital', 15, pageHeight - 20);
      doc.text('123 Healing Street, Healthcare City', 15, pageHeight - 15);
      doc.text('www.easycare.com', 15, pageHeight - 10);

      const appointmentId = `A${Math.floor(Math.random() * 10000)}`;
      doc.setFont('helvetica', 'bold');
      doc.text(`Appointment ID: ${appointmentId}`, pageWidth - 15, pageHeight - 15, { align: 'right' });

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `EasyCare_Appointment_${savedAppointment.patientName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Appointment PDF downloaded successfully");
    } catch (error) {
      toast.error("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <Topbar />
      <Container fluid className="p-0">
        <div className="appointment-banner position-relative">
          <img src={appointment} alt="Appointment Banner" className="w-100 img-fluid" style={{ height: '50vh', objectFit: 'cover' }} />
          <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
            <h1 className="text-white">Book an Appointment</h1>
            <p className="text-white">Book an appointment with our experienced doctors in just a few clicks.</p>
          </div>
        </div>

        <Container className="my-5">
          {!savedAppointment ? (
            <Card className="p-4 shadow">
              <h3 className="text-center mb-4">Book an Appointment</h3>
              
              <Form onSubmit={handleAppointment}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Patient Name</Form.Label>
                      <Form.Control type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Department</Form.Label>
                      <Form.Select value={department} onChange={(e) => {
                        setDepartment(e.target.value);
                        setDoctor(""); // Reset doctor when department changes
                      }} required>
                        <option value="">Select</option>
                        {departmentsArray.map((dep, index) => (
                          <option key={index} value={dep}>{dep}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Doctor</Form.Label>
                      <Form.Select 
                        value={doctor} 
                        onChange={(e) => setDoctor(e.target.value)} 
                        disabled={!department}
                        required
                      >
                        <option value="">Select</option>
                        {doctors
                          .filter(doc => doc.doctordepartment === department)
                          .map((doc, index) => (
                            <option key={index}>{`${doc.firstname} ${doc.lastname}`}</option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Appointment Date</Form.Label>
                      <DatePicker
                        selected={appointmentDate}
                        onChange={(date) => setAppointmentDate(date)}
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        placeholderText="Select a date"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Time Slot</Form.Label>
                      <Form.Select 
                        value={timeSlot} 
                        onChange={(e) => setTimeSlot(e.target.value)}
                        required
                      >
                        <option value="">Select Time Slot</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                      </Form.Select>
                      {isCheckingAvailability && (
                        <small className="text-info">Checking availability...</small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mt-4">
                      <Form.Check
                        type="checkbox"
                        label="Visited before?"
                        checked={hasVisited}
                        onChange={(e) => setHasVisited(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100 mt-3"
                  disabled={isCheckingAvailability}
                >
                  Book Appointment
                </Button>
              </Form>
            </Card>
          ) : (
            <Card className="shadow-lg p-4 rounded">
              <div className="text-center mb-4">
                <h2 className="text-success">Appointment Confirmed!</h2>
                <p className="text-muted">Your appointment has been successfully booked.</p>
              </div>
              
              <Row className="mb-4">
                <Col xs={12} md={6} className="mb-3">
                  <p><strong>Patient:</strong> {savedAppointment.patientName}</p>
                  <p><strong>Phone:</strong> {savedAppointment.phone}</p>
                  <p><strong>Gender:</strong> {savedAppointment.gender}</p>
                  <p><strong>Time:</strong> {savedAppointment.appointment_time}</p>
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <p><strong>Date:</strong> {new Date(savedAppointment.appointment_date).toLocaleDateString()}</p>
                  <p><strong>Department:</strong> {savedAppointment.department}</p>
                  <p><strong>Doctor:</strong> Dr. {savedAppointment.doctor_firstName} {savedAppointment.doctor_lastName}</p>
                </Col>
              </Row>
              
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  variant="success" 
                  onClick={generatePDF} 
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? "Generating PDF..." : "Download Appointment PDF"}
                </Button>
                
                <Button 
                  variant="outline-primary" 
                  onClick={() => setSavedAppointment(null)}
                >
                  Book Another Appointment
                </Button>
              </div>
            </Card>
          )}
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Appointment;
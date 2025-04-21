import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Container, Spinner, Alert } from 'react-bootstrap';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import appointmentBanner from '../assets/appointment page.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock, FaUserMd, FaDownload, FaPlus } from 'react-icons/fa';

const Appointment = () => {
  // Form state
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    gender: "",
    appointmentDate: null,
    timeSlot: "",
    department: "",
    doctor: "",
    hasVisited: false
  });
  
  // App state
  const [doctors, setDoctors] = useState([]);
  const [savedAppointment, setSavedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [existingAppointments, setExistingAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);

  const token = localStorage.getItem("token");

  const departmentsArray = [
    "Cardiology", "Dermatology", "Orthopedics", "Neurology",
    "Oncology", "Radiology", "Physical Therapy", "Pediatrics", "ENT"
  ];

  // Generate time slots from 9 AM to 8 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 20; hour++) {
      const time = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      slots.push(time);
    }
    return slots;
  };

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, []);

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
    fetchExistingAppointments();
  }, []);

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
      console.error("Error fetching appointments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Reset doctor when department changes
    if (name === 'department') {
      setFormData(prev => ({
        ...prev,
        doctor: ""
      }));
      setAvailabilityStatus(null);
    }
    
    // Reset availability status when any relevant field changes
    if (['department', 'doctor', 'appointmentDate', 'timeSlot'].includes(name)) {
      setAvailabilityStatus(null);
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      appointmentDate: date
    }));
    setAvailabilityStatus(null);
  };

  const checkAvailability = async () => {
    if (!formData.doctor || !formData.appointmentDate || !formData.timeSlot) return;
    
    setIsCheckingAvailability(true);
    
    try {
      await fetchExistingAppointments();
      
      const selectedDoctor = doctors.find(doc => 
        `${doc.firstname} ${doc.lastname}` === formData.doctor
      );
      
      if (selectedDoctor) {
        const isAvailable = !existingAppointments.some(apt => {
          const aptDate = new Date(apt.appointment_date).toISOString().split('T')[0];
          const selectedDate = formData.appointmentDate.toISOString().split('T')[0];
          return (
            apt.doctor_firstName === selectedDoctor.firstname &&
            apt.doctor_lastName === selectedDoctor.lastname &&
            aptDate === selectedDate &&
            apt.appointment_time === formData.timeSlot
          );
        });
        
        setAvailabilityStatus(isAvailable ? 'available' : 'unavailable');
        
        if (!isAvailable) {
          toast.warning("This time slot is already booked. Please select another time.");
        }
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      toast.error("Error checking availability. Please try again.");
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!formData.doctor) {
      toast.error("Please select a doctor.");
      setIsLoading(false);
      return;
    }

    const selectedDoctor = doctors.find(doc => 
      `${doc.firstname} ${doc.lastname}` === formData.doctor
    );

    if (!selectedDoctor || selectedDoctor.doctordepartment !== formData.department) {
      toast.error("Doctor not found in this department.");
      setIsLoading(false);
      return;
    }

    // Check if time slot is available
    const isAvailable = !existingAppointments.some(apt => {
      const aptDate = new Date(apt.appointment_date).toISOString().split('T')[0];
      const selectedDate = formData.appointmentDate.toISOString().split('T')[0];
      return (
        apt.doctor_firstName === selectedDoctor.firstname &&
        apt.doctor_lastName === selectedDoctor.lastname &&
        aptDate === selectedDate &&
        apt.appointment_time === formData.timeSlot
      );
    });

    if (!isAvailable) {
      toast.error("This time slot is no longer available. Please select another time.");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/appointment/post",
        {
          patientName: formData.patientName,
          phone: formData.phone,
          gender: formData.gender,
          appointment_time: formData.timeSlot,
          appointment_date: formData.appointmentDate,
          department: formData.department,
          doctor_firstName: selectedDoctor.firstname,
          doctor_lastName: selectedDoctor.lastname,
          hasVisited: formData.hasVisited
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(data.message);
      
      // Update existing appointments to prevent double booking
      setExistingAppointments(prev => [...prev, {
        patientName: formData.patientName,
        phone: formData.phone,
        gender: formData.gender,
        appointment_time: formData.timeSlot,
        appointment_date: formData.appointmentDate,
        department: formData.department,
        doctor_firstName: selectedDoctor.firstname,
        doctor_lastName: selectedDoctor.lastname,
        hasVisited: formData.hasVisited
      }]);
      
      // Save the successful appointment
      setSavedAppointment({
        patientName: formData.patientName,
        phone: formData.phone,
        gender: formData.gender,
        appointment_time: formData.timeSlot,
        appointment_date: formData.appointmentDate,
        department: formData.department,
        doctor_firstName: selectedDoctor.firstname,
        doctor_lastName: selectedDoctor.lastname,
        hasVisited: formData.hasVisited
      });

      // Reset form
      setFormData({
        patientName: "",
        phone: "",
        gender: "",
        appointmentDate: null,
        timeSlot: "",
        department: "",
        doctor: "",
        hasVisited: false
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking appointment");
    } finally {
      setIsLoading(false);
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

      // Header with logo and title
      doc.setFillColor(22, 160, 133);
      doc.rect(0, 0, pageWidth, 30, 'F');
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text('EasyCare Hospital', pageWidth / 2, 15, { align: 'center' });

      // Appointment confirmation title
      doc.setFontSize(16);
      doc.setTextColor(22, 160, 133);
      doc.text('APPOINTMENT CONFIRMATION', pageWidth / 2, 45, { align: 'center' });

      // Appointment details
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
      };

      // Patient information box
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(15, 60, pageWidth - 30, 70, 3, 3, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.text('Patient Information:', 20, 70);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${savedAppointment.patientName}`, 20, 80);
      doc.text(`Phone: ${savedAppointment.phone}`, 20, 90);
      doc.text(`Gender: ${savedAppointment.gender}`, 20, 100);
      doc.text(`Previous Visit: ${savedAppointment.hasVisited ? 'Yes' : 'No'}`, 20, 110);

      // Appointment details box
      doc.roundedRect(15, 135, pageWidth - 30, 70, 3, 3, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.text('Appointment Details:', 20, 145);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${formatDate(savedAppointment.appointment_date)}`, 20, 155);
      doc.text(`Time: ${savedAppointment.appointment_time}`, 20, 165);
      doc.text(`Department: ${savedAppointment.department}`, 20, 175);
      doc.text(`Doctor: Dr. ${savedAppointment.doctor_firstName} ${savedAppointment.doctor_lastName}`, 20, 185);

      // Important information
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(15, 210, pageWidth - 30, 40, 3, 3, 'FD');
      
      doc.setFontSize(12);
      doc.setTextColor(22, 160, 133);
      doc.setFont('helvetica', 'bold');
      doc.text('Important Information:', 20, 220);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.text('• Please arrive 15 minutes before your appointment time.', 20, 230);
      doc.text('• Bring your ID and any relevant medical documents.', 20, 237);

      // Footer
      doc.setDrawColor(22, 160, 133);
      doc.line(15, pageHeight - 20, pageWidth - 15, pageHeight - 20);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text('EasyCare Hospital • 123 Healing Street • Healthcare City • www.easycare.com', 
        pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Generate and download PDF
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
      
      {/* Banner Section */}
      <div className="appointment-banner position-relative mb-5">
        <img 
          src={appointmentBanner} 
          alt="Appointment Banner" 
          className="w-100 img-fluid" 
          style={{ height: '40vh', objectFit: 'cover' }} 
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center w-100 px-3">
          <h1 className="text-white fw-bold mb-3">Book an Appointment</h1>
          <p className="text-white lead d-none d-md-block">
            Schedule your visit with our expert healthcare professionals
          </p>
        </div>
      </div>

      <Container className="mb-5">
        {!savedAppointment ? (
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
                <Card.Header className="bg-primary text-white py-3">
                  <h3 className="mb-0 text-center">
                    <FaCalendarAlt className="me-2" />
                    Appointment Request Form
                  </h3>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Group controlId="patientName">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="phone">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Group controlId="gender">
                          <Form.Label>Gender</Form.Label>
                          <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="department">
                          <Form.Label>Department</Form.Label>
                          <Form.Select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Department</option>
                            {departmentsArray.map((dept, idx) => (
                              <option key={idx} value={dept}>{dept}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Group controlId="doctor">
                          <Form.Label>
                            <FaUserMd className="me-2" />
                            Doctor
                          </Form.Label>
                          <Form.Select
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleInputChange}
                            disabled={!formData.department}
                            required
                          >
                            <option value="">Select Doctor</option>
                            {doctors
                              .filter(doc => doc.doctordepartment === formData.department)
                              .map((doc, idx) => (
                                <option key={idx} value={`${doc.firstname} ${doc.lastname}`}>
                                  Dr. {doc.firstname} {doc.lastname} ({doc.doctordepartment})
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="appointmentDate">
                          <Form.Label>
                            <FaCalendarAlt className="me-2" />
                            Appointment Date
                          </Form.Label>
                          <DatePicker
                            selected={formData.appointmentDate}
                            onChange={handleDateChange}
                            className="form-control"
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()}
                            placeholderText="Select a date"
                            required
                            onCalendarClose={checkAvailability}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Group controlId="timeSlot">
                          <Form.Label>
                            <FaClock className="me-2" />
                            Time Slot
                          </Form.Label>
                          <Form.Select
                            name="timeSlot"
                            value={formData.timeSlot}
                            onChange={handleInputChange}
                            required
                            onBlur={checkAvailability}
                          >
                            <option value="">Select Time Slot</option>
                            {timeSlots.map((time, idx) => (
                              <option key={idx} value={time}>{time}</option>
                            ))}
                          </Form.Select>
                          {isCheckingAvailability && (
                            <small className="text-primary mt-1 d-block">
                              <Spinner animation="border" size="sm" className="me-2" />
                              Checking availability...
                            </small>
                          )}
                          {availabilityStatus === 'available' && (
                            <small className="text-success mt-1 d-block">
                              This time slot is available!
                            </small>
                          )}
                          {availabilityStatus === 'unavailable' && (
                            <small className="text-danger mt-1 d-block">
                              This time slot is not available. Please choose another.
                            </small>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6} className="d-flex align-items-end">
                        <Form.Group controlId="hasVisited" className="w-100">
                          <Form.Check
                            type="checkbox"
                            label="Have you visited us before?"
                            name="hasVisited"
                            checked={formData.hasVisited}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid mt-4">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                        disabled={isLoading || isCheckingAvailability}
                      >
                        {isLoading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Booking Appointment...
                          </>
                        ) : (
                          'Book Appointment Now'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
                <Card.Header className="bg-success text-white py-3">
                  <h3 className="mb-0 text-center">
                    <FaCalendarAlt className="me-2" />
                    Appointment Confirmed!
                  </h3>
                </Card.Header>
                <Card.Body className="p-4">
                  <Alert variant="success" className="text-center">
                    Your appointment has been successfully booked. A confirmation has been sent to your email.
                  </Alert>

                  <div className="appointment-details bg-light p-4 rounded-3 mb-4">
                    <h5 className="mb-4 text-primary">Appointment Details</h5>
                    <Row>
                      <Col md={6}>
                        <p><strong>Patient Name:</strong> {savedAppointment.patientName}</p>
                        <p><strong>Phone:</strong> {savedAppointment.phone}</p>
                        <p><strong>Gender:</strong> {savedAppointment.gender}</p>
                        <p><strong>Previous Visit:</strong> {savedAppointment.hasVisited ? 'Yes' : 'No'}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>Date:</strong> {new Date(savedAppointment.appointment_date).toLocaleDateString('en-US', { 
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                        })}</p>
                        <p><strong>Time:</strong> {savedAppointment.appointment_time}</p>
                        <p><strong>Department:</strong> {savedAppointment.department}</p>
                        <p><strong>Doctor:</strong> Dr. {savedAppointment.doctor_firstName} {savedAppointment.doctor_lastName}</p>
                      </Col>
                    </Row>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                    <Button 
                      variant="success" 
                      onClick={generatePDF} 
                      disabled={isGeneratingPDF}
                      className="d-flex align-items-center justify-content-center"
                    >
                      {isGeneratingPDF ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <FaDownload className="me-2" />
                          Download Confirmation
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline-primary" 
                      onClick={() => setSavedAppointment(null)}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <FaPlus className="me-2" />
                      Book Another Appointment
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Appointment;
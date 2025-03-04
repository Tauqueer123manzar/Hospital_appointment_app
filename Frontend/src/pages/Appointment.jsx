import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import appointment from '../assets/appointment page.png';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const token = localStorage.getItem("token");

  const departmentsArray = [
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Pediatrics",
    "ENT"
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
  }, []);

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

    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/appointment/post",
        {
          patientName,
          phone,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: selectedDoctor.firstname,
          doctor_lastName: selectedDoctor.lastname,
          hasVisited
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(data.message);
      setPatientName("");
      setPhone("");
      setGender("");
      setAppointmentDate("");
      setDepartment("");
      setDoctor("");
      setHasVisited(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking appointment");
    }
  };

  return (
    <>
      <Topbar />
      <Container fluid className="p-0">
        <div className="appointment-banner">
          <img src={appointment} alt="Appointment Banner" className="w-100 img-fluid" style={{ height: '100vh', objectFit: 'cover' }} />
        </div>

        <Container className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center w-100 px-3 m-5">
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <h1 className="text-white">Book an Appointment</h1>
              <p className="text-dark">Book an appointment with our experienced doctors in just a few clicks.</p>
            </Col>
          </Row>

          <Card className="shadow-lg p-4 m-4 rounded bg-light" style={{ maxWidth: '600px', width: '100%' }}>
            <h3 className="text-center mb-3">Book an Appointment</h3>
            <Form onSubmit={handleAppointment}>
              <Form.Group controlId="patientName" className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="appointmentDate" className="mb-3">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={phone} placeholder='Enter your phone' onChange={(e) => setPhone(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="gender" className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="department" className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select value={department} onChange={(e) => { setDepartment(e.target.value); setDoctor(""); }} required>
                  <option value="">Select Department</option>
                  {departmentsArray.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="doctor" className="mb-3">
                <Form.Label>Doctor</Form.Label>
                <Form.Select value={doctor} onChange={(e) => setDoctor(e.target.value)} disabled={!department} required>
                  <option value="">Select Doctor</option>
                  {doctors
                    .filter(doc => doc.doctordepartment === department)
                    .map((doc, idx) => (
                      <option key={idx} value={`${doc.firstname} ${doc.lastname}`}>
                        {doc.firstname} {doc.lastname}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
                <Form.Label className="mb-0">Have you visited before?</Form.Label>
                <Form.Check type="checkbox" checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} />
              </Form.Group>

              <Button type="submit" className="mt-3 w-100 btn-primary">GET APPOINTMENT</Button>
            </Form>
          </Card>
        </Container>

        <Footer />
      </Container>
    </>
  );
};

export default Appointment;

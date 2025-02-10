import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import appointment from '../assets/appointment page.png';

const Appointment = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    specialization: "",
    doctorName: "",
    appointmentDate: "",
    hasVisited: false,
    status: "Pending",
    doctorId: "",
    patientId: "1234567890", 
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');

  const specializationData = [
    "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Radiology", "Dermatology", "Oncology", "ENT"
  ];

  const doctorsData = [
    {
      specialization: "Pediatrics",
      doctors: [
        { id: "doc1", name: "Dr. Smith", availableTimings: ["9:00 AM", "10:00 AM"], charge: 500 },
      ],
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecializationChange = (e) => {
    setFormData({ ...formData, specialization: e.target.value, doctorName: "", doctorId: "" });
    setSelectedDoctor(null);
    setTimeSlot('');
  };

  const handleDoctorChange = (e) => {
    const selectedDoctorName = e.target.value;
    const doctor = doctorsData
      .find(data => data.specialization === formData.specialization)
      ?.doctors.find(doc => doc.name === selectedDoctorName);

    setFormData({ ...formData, doctorName: selectedDoctorName, doctorId: doctor ? doctor.id : "" });
    setSelectedDoctor(doctor);
    setTimeSlot('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.specialization || !formData.appointmentDate || !formData.doctorName || !timeSlot) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      const response = await fetch('/api/v1/appointment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, selectTime: timeSlot }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while booking the appointment.");
    }
  };

  return (
    <>
      <Topbar />
      <Container fluid className="p-0 position-relative">
        <div className="appointment-banner position-relative">
          <img src={appointment} alt="Appointment Banner" className="w-100 img-fluid" style={{ height: '120vh', objectFit: 'cover' }} />
        </div>
        <Container className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center w-100 px-3">
          <Card className="shadow-lg p-4 rounded bg-light" style={{ maxWidth: '600px', width: '100%' }}>
            <h3 className="text-center mb-3">Book an Appointment</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="patientName" className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" name="patientName" value={formData.patientName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="specialization" className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Select name="specialization" value={formData.specialization} onChange={handleSpecializationChange} required>
                  <option value="">Select Specialization</option>
                  {specializationData.map((spec, idx) => <option key={idx} value={spec}>{spec}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="appointmentDate" className="mb-3">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="doctorName" className="mb-3">
                <Form.Label>Doctor Name</Form.Label>
                <Form.Select name="doctorName" value={formData.doctorName} onChange={handleDoctorChange} disabled={!formData.specialization} required>
                  <option value="">Select Doctor</option>
                  {doctorsData.filter(data => data.specialization === formData.specialization)
                    .flatMap(data => data.doctors)
                    .map((doc, idx) => <option key={idx} value={doc.name}>{doc.name}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="timeSlot" className="mb-3">
                <Form.Label>Select Time Slot</Form.Label>
                <Form.Select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} disabled={!selectedDoctor} required>
                  <option value="">Select Time Slot</option>
                  {selectedDoctor?.availableTimings.map((time, idx) => <option key={idx} value={time}>{time}</option>)}
                </Form.Select>
              </Form.Group>

              <Button type="submit" className="mt-3 w-100 btn-primary" disabled={!selectedDoctor || !timeSlot}>Confirm Appointment</Button>
            </Form>
          </Card>
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default Appointment;

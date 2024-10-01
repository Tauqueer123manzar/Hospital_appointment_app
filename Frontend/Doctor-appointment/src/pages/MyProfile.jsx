import React, { useState } from 'react';
import { Form, Card, ListGroup, Col, Row, Image,Container } from 'react-bootstrap';
import image from '../assets/Tauqueer Image.jpg';
import Topbar from '../components/Topbar';
const MyProfile = () => {
  // State for storing user profile, appointments, and prescriptions
  const [profile, setProfile] = useState({
    name: 'Md Tauqueer Manzar',
    city: 'Hyderabad',
    profilePicture: image
  });

  const [appointments, setAppointments] = useState([
    { id: 1, appointmentName: 'General Checkup', doctorName: 'Dr. Ahmed', date: '2024-09-30' },
    { id: 2, appointmentName: 'Dermatology', doctorName: 'Dr. Sultana', date: '2024-10-05' }
  ]);

  const [prescriptions, setPrescriptions] = useState([]);

  // Handle Profile Picture Upload
  const handleProfilePictureChange = (e) => {
    setProfile({ ...profile, profilePicture: URL.createObjectURL(e.target.files[0]) });
  };

  // Handle Prescription Upload
  const handlePrescriptionUpload = (e) => {
    const newPrescription = URL.createObjectURL(e.target.files[0]);
    setPrescriptions([...prescriptions, newPrescription]);
  };

  return (
    <>
    <Topbar/>
    <Container fluid>
    <div className="container mt-5">
      {/* Profile Section */}
      <Card className="mb-4">
        <Card.Header>My Profile</Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              {profile.profilePicture ? (
                <Image src={profile.profilePicture} roundedCircle width="150" height="150" />
              ) : (
                <Image src="default-profile.png" roundedCircle width="150" height="150" />
              )}
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Upload Profile Picture</Form.Label>
                <Form.Control type="file" onChange={handleProfilePictureChange} />
              </Form.Group>
            </Col>
            <Col md={9}>
              <h4>{profile.name}</h4>
              <p>{profile.city}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Appointment Records Section */}
      <Card className="mb-4">
        <Card.Header>Appointment Records</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {appointments.map(appointment => (
              <ListGroup.Item key={appointment.id}>
                <strong>{appointment.appointmentName}</strong> with {appointment.doctorName} on {appointment.date}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Prescription Upload Section */}
      <Card className="mb-4">
        <Card.Header>Upload Prescriptions</Card.Header>
        <Card.Body>
          <Form.Group controlId="prescriptionUpload">
            <Form.Label>Upload Prescription</Form.Label>
            <Form.Control type="file" onChange={handlePrescriptionUpload} />
          </Form.Group>

          {/* Display uploaded prescriptions */}
          <Row className="mt-3">
            {prescriptions.map((prescription, index) => (
              <Col md={4} key={index} className="mb-3">
                <Image src={prescription} thumbnail />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
    </Container>
    </>
  );
};

export default MyProfile;

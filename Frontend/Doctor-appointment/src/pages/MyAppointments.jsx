import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Axios for making API calls
import Topbar from '../components/Topbar';
import john from '../assets/file (3) 1.jpg'
import jane from '../assets/file (2) 1.jpg'
import '../App.css';
const MyAppointments = () => {
  const [appointment, setAppointments] = useState([]);
  const appointments=[
      {
        "_id": "appointment_id_1",
        "doctor": {
          "name": "Dr. John Doe",
          "department": "Cardiology",
          "image": john
        },
        "date": "2024-09-30",
        "time": "10:00 AM",
        "description": "Follow-up for heart check-up",
        "visited": true
      },
      {
        "_id": "appointment_id_2",
        "doctor": {
          "name": "Dr. Jane Smith",
          "department": "Dermatology",
          "image":jane
        },
        "date": "2024-10-05",
        "time": "12:00 PM",
        "description": "",
        "visited": false
      }

  ]
  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments'); // API call to fetch appointments
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
    <Topbar/>
    <Container>
      <h2 className="text-center my-4" style={{fontWeight:"700",color:"darkcyan",fontStyle:"initial"}}>My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center">No appointments booked yet.</p>
      ) : (
        <Row>
          {appointments.map((appointment) => (
            <Col md={6} lg={4} key={appointment._id}>
              <Card className="mb-4">
                <Card.Img
                  variant="top"
                  src={appointment.doctor.image}
                  alt={appointment.doctor.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body style={{height:"300px"}}>
                  <Card.Title>{appointment.doctor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {appointment.doctor.department}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()} <br />
                    <strong>Time:</strong> {appointment.time} <br />
                    {appointment.visited && (
                      <div>
                        <strong>Visit Summary:</strong> {appointment.description}
                      </div>
                    )}
                  </Card.Text>
                  <Button variant="primary" disabled={appointment.visited}>
                    {appointment.visited ? 'Visited' : 'Upcoming'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
    </>
  );
};

export default MyAppointments;

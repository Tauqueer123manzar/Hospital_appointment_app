import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import doctor1 from '../assets/file (2) 1.jpg';
import doctor2 from '../assets/file (2) 2.jpg';
import doctor3 from '../assets/file (2) 3.png';
import doctor4 from '../assets/file (3) 1.jpg';
import doctor5 from '../assets/file (3) 3.png';
import doctor6 from '../assets/file (4) 1.jpg';
import doctor7 from '../assets/file (4) 2.jpg';
import doctor8 from '../assets/file (4) 4.png';
import doctor9 from '../assets/file (5) 1.jpg';
import doctor10 from '../assets/file (5) 2.png';
import doctor11 from '../assets/file (5) 3.png';
import doctor12 from '../assets/file (5) 4.png';
import { FaCircle } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Doctors = () => {
  const navigate = useNavigate();
  const Doctorsdata = [
    {
      id: 1,
      image: doctor1,
      title: "Available",
      name: "Dr. Richard James",
      description: "Cardiology",
    },
    {
      id: 2,
      image: doctor2,
      title: "Available",
      name: "Dr. Richard James",
      description: "ENT",
    },
    {
      id: 3,
      image: doctor3,
      title: "Available",
      name: "Dr. Richard James",
      description: "Neurology",
    },
    {
      id: 4,
      image: doctor4,
      title: "Available",
      name: "Dr. Richard James",
      description: "Orthopedics",
    },
    {
      id: 5,
      image: doctor5,
      title: "Available",
      name: "Dr. Richard James",
      description: "Therapy",
    },
    {
      id: 6,
      image: doctor6,
      title: "Available",
      name: "Dr. Richard James",
      description: "Dermatology",
    },
    {
      id: 7,
      image: doctor7,
      title: "Available",
      name: "Dr. Richard James",
      description: "Pediatrics",
    },
    {
      id: 8,
      image: doctor8,
      title: "Available",
      name: "Dr. Richard James",
      description: "General physician",
    },
    {
      id: 9,
      image: doctor9,
      title: "Available",
      name: "Dr. Richard James",
      description: "Oncology",
    },
    {
      id: 10,
      image: doctor10,
      title: "Available",
      name: "Dr. Richard James",
      description: "ENT",
    },
    {
      id: 11,
      image: doctor11,
      title: "Available",
      name: "Dr. Richard James",
      description: "Neurology",
    },
    {
      id: 12,
      image: doctor12,
      title: "Available",
      name: "Dr. Richard James",
      description: "Therapy",
    },
    {
      id: 13,
      image: doctor9,
      title: "Available",
      name: "Dr. Richard James",
      description: "Oncology",
    },
    {
      id: 14,
      image: doctor10,
      title: "Available",
      name: "Dr. Richard James",
      description: "ENT",
    },
    {
      id: 15,
      image: doctor11,
      title: "Available",
      name: "Dr. Richard James",
      description: "Neurology",
    },
    {
      id: 16,
      image: doctor12,
      title: "Available",
      name: "Dr. Richard James",
      description: "Therapy",
    },
  ];

  const [visibleDoctors, setVisibleDoctors] = useState(12);

  // Function to handle navigation to the doctor's profile.
  const handleDoctorClick = (id) => {
    navigate(`/doctor/${id}`);
  };

  // Function to show more doctors.
  const handleShowMore = () => {
    setVisibleDoctors((prev) => prev + 4);
  };

  return (
    <Container fluid>
      <h1 className="text-center mt-4" style={{ fontFamily: "initial", fontWeight: "bold", color: "darkcyan" }}>
        Top Doctors to Book
      </h1>
      <Row>
        <p className="text-center" style={{ fontFamily: "initial" }}>
          Simply browse through our extensive list of trusted doctors.
        </p>
        {Doctorsdata.slice(0, visibleDoctors).map((doctor) => (
          <Col xs={12} sm={6} md={4} lg={2} className="p-3" key={doctor.id}>
            <Card className="doctorcard" onClick={() => handleDoctorClick(doctor.id)} style={{ cursor: "pointer" }}>
              <div className="image-wrapper">
                <Card.Img variant="top" src={doctor.image} className="doctorimage" />
              </div>
              <Card.Body>
                <Card.Subtitle style={{ color: 'lightgreen', padding: "5px" }}>
                  <FaCircle style={{ fontSize: "10px" }} /> {doctor.title}
                </Card.Subtitle>
                <Card.Subtitle>{doctor.name}</Card.Subtitle>
                <Card.Title>{doctor.description}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {visibleDoctors < Doctorsdata.length && (
        <div className="text-center mt-4 mb-4">
          <Button variant="primary" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Doctors;

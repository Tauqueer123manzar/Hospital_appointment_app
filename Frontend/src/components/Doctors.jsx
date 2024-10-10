import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCircle } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Doctors = ({ doctor }) => { 
  const navigate = useNavigate();
  
  const [visibleDoctors, setVisibleDoctors] = useState(12);

  // Function to handle navigation to the doctor's profile.
  const handleDoctorClick = (id) => {
    navigate(`/doctor/${id}`);
  };

  // Function to show more doctors.
  const handleShowMore=()=>{
    setVisibleDoctors(prev => prev + 12)
  }

  return (
    <Container fluid>
      <h3 className="text-center mt-4" style={{ fontFamily: "initial", fontWeight: "bold", color: "darkcyan" }}>
        Top Doctors to Book
      </h3>
      <Row>
        <p className="text-center" style={{ fontFamily: "initial" }}>
          Simply browse through our extensive list of trusted doctors.
        </p>
        {doctor.slice(0, visibleDoctors).map((doctorItem) => (
          <Col xs={12} sm={6} md={4} lg={2} className="p-3" key={doctorItem.id}>
            <Card className="doctorcard" onClick={() => handleDoctorClick(doctorItem.id)} style={{ cursor: "pointer",height:"350px"}}>
              <div className="image-wrapper">
                <Card.Img variant="top" src={doctorItem.image} className="doctorimage" />
              </div>
              <Card.Body>
                <Card.Subtitle style={{ color: 'lightgreen', padding: "5px" }}>
                  <FaCircle style={{ fontSize: "10px" }} /> {doctorItem.title}
                </Card.Subtitle>
                <Card.Subtitle>{doctorItem.name}</Card.Subtitle>
                <Card.Title>{doctorItem.description}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {visibleDoctors < doctor.length && (
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

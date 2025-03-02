import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCircle } from "react-icons/fa6";
import axios from 'axios';
import '../App.css';

const Doctors = ({ selectedDepartment }) => {
  const [doctors, setDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState(12);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/doctors", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          },
        });
        setDoctors(response.data.doctors);
      } catch (error) {
        console.log(error.response?.data?.message || "Error fetching doctor data");
      }
    }
    fetchDoctorData();
  }, []);

  const filteredDoctors = selectedDepartment === 'All'
    ? doctors
    : doctors.filter(doctor => doctor.doctordepartment === selectedDepartment);

  return (
    <Container fluid>
      <h3 className="text-center mt-4 title">Top Doctors to Book</h3>
      <p className="text-center subtitle">Simply browse through our extensive list of trusted doctors.</p>
      <Row>
        {filteredDoctors.slice(0, visibleDoctors).map((doctorItem) => (
          <Col xs={12} sm={6} md={4} lg={3} className="p-3" key={doctorItem.id}>
            <Card className="doctor-card">
              <div className="img-container">
                <Card.Img
                  variant="top"
                  src={doctorItem.docAvatar ? doctorItem.docAvatar.url : 'fallback-image-url'}
                  alt='Doctor Avatar'
                  className="doctor-img"
                />
              </div>
              <Card.Body className="doctor-card-body">
                <Card.Subtitle className="doctor-name">
                  <FaCircle className="status-icon mt-1" /><span>{doctorItem.firstname} {doctorItem.lastname}</span>
                </Card.Subtitle>
                <Card.Subtitle className="doctor-info p-2">Email: {doctorItem.email}</Card.Subtitle>
                <Card.Subtitle className="doctor-info p-2">Phone: {doctorItem.phone}</Card.Subtitle>
                <Card.Subtitle className="doctor-info p-2">Gender: {doctorItem.gender}</Card.Subtitle>
                <Card.Subtitle className="doctor-info p-2">Department: {doctorItem.doctordepartment}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {visibleDoctors < filteredDoctors.length && (
        <div className="text-center mt-4 mb-4">
          <Button className="show-more-btn" onClick={() => setVisibleDoctors(prev => prev + 12)}>
            Show More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Doctors;
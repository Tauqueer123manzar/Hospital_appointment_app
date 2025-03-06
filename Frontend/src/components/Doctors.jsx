import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCircle } from "react-icons/fa6";
import { Link } from 'react-router-dom';
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

  const visibleDoctorsHandler = () => {
    setVisibleDoctors(prevCounr=> prevCounr + 4); 

  }


  const filteredDoctors = selectedDepartment === 'All'
    ? doctors
    : doctors.filter(doctor => doctor.doctordepartment === selectedDepartment);

  return (
    <Container fluid>
      <h3 className="text-center mt-4 title">Top Doctors to Book</h3>
      <p className="text-center subtitle">Simply browse through our extensive list of trusted doctors.</p>
      <Row>
        {filteredDoctors.slice(0, visibleDoctors).map((doctorItem) => (
          <Col xs={12} sm={6} md={4} lg={3} className="p-3" key={doctorItem._id}>
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
                  <FaCircle className="status-icon mt-1" />
                  <span>{doctorItem.firstname} {doctorItem.lastname}</span>
                </Card.Subtitle>
                <Card.Subtitle className="doctor-info p-2">Email: {doctorItem.email}</Card.Subtitle>
                <Card.Subtitle className="doctor-info p-2">Phone: {doctorItem.phone}</Card.Subtitle>
                <Card.Subtitle className="doctor-info p-2">Department: {doctorItem.doctordepartment}</Card.Subtitle>
                {/* Add a Link to the Doctor Profile */}
                <Link to={`/doctor/${doctorItem._id}`}>
                  <Button variant="primary" className="mt-4">View Profile</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col className="text-center" xs={12} lg={12}>
        <Button variant="primary" className="mt-4 mb-3" onClick={visibleDoctorsHandler}>Load More</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Doctors;

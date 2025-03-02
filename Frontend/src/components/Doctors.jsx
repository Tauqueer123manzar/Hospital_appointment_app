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

  // Filter doctors based on selectedDepartment
  const filteredDoctors = selectedDepartment === 'All'
    ? doctors
    : doctors.filter(doctor => doctor.doctordepartment === selectedDepartment);

  return (
    <Container fluid>
      <h3 className="text-center mt-4" style={{ fontFamily: "initial", fontWeight: "bold", color: "darkcyan" }}>
        Top Doctors to Book
      </h3>
      <Row>
        <p className="text-center" style={{ fontFamily: "initial" }}>
          Simply browse through our extensive list of trusted doctors.
        </p>
        {filteredDoctors.slice(0, visibleDoctors).map((doctorItem) => (
          <Col xs={12} sm={6} md={4} lg={3} className="p-3" key={doctorItem.id}>
            <Card className="doctorcard" style={{ cursor: "pointer", height: "450px" }}>
              <Card.Img
                variant="top"
                src={doctorItem.docAvatar ? doctorItem.docAvatar.url : 'fallback-image-url'}
                alt='Doctor Avatar'
                style={{ height: '300px', width: "100%" }}
              />
              <Card.Body>
                <Card.Subtitle style={{ color: 'lightgreen', padding: "5px" }}>
                  <FaCircle style={{ fontSize: "10px" }} /><span className='ms-2'>{doctorItem.firstname} {doctorItem.lastname}</span>
                </Card.Subtitle>
                <Card.Subtitle style={{ fontFamily: "initial" }}><span>Email: </span>{doctorItem.email}</Card.Subtitle>
                <Card.Subtitle style={{ fontFamily: "initial" }}><span>Phone: </span>{doctorItem.phone}</Card.Subtitle>
                <Card.Subtitle style={{ fontFamily: "initial" }}><span>Gender: </span>{doctorItem.gender}</Card.Subtitle>
                <Card.Subtitle style={{ fontFamily: "initial" }}><span>Department: </span>{doctorItem.doctordepartment}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {visibleDoctors < filteredDoctors.length && (
        <div className="text-center mt-4 mb-4">
          <Button variant="primary" onClick={() => setVisibleDoctors(prev => prev + 12)}>
            Show More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Doctors;

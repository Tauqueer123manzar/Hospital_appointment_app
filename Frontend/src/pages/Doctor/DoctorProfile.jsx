import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/DoctorSidebar';
import { Card, Spinner, Alert, Button, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctorprofile = async () => {
      try {
        const token = localStorage.getItem("doctorToken");
        const { data } = await axios.get("http://localhost:8080/api/v1/user/doctor/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        setDoctor(data.user);
        setLoading(false);
      } catch (error) {
        setError("Failed to load doctor profile", error);
        setLoading(false);
      }
    };
    fetchDoctorprofile();
  }, []);

  return (
    <>
      <Sidebar />
      <div style={{ 
        marginLeft: '280px', 
        padding: '30px 40px',
        
      }}>
        <h2 className="mb-4 text-primary">Doctor Profile</h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading profile data...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="shadow-sm">{error}</Alert>
        ) : (
          <Card className="shadow-lg border-0 overflow-hidden">
            <Row className="align-items-center g-0">
              <Col md={4} className="text-center p-4" style={{ backgroundColor: '#f0f7ff' }}>
                <Image
                  src={doctor.docAvatar?.url || "https://via.placeholder.com/150"}
                  roundedCircle
                  width="180"
                  height="180"
                  className="border shadow"
                  alt="Doctor Avatar"
                />
                <h3 className="mt-4 mb-1 text-primary">
                  Dr. {doctor.firstname} {doctor.lastname}
                </h3>
                <p className="text-muted mb-3">
                  {doctor.doctordepartment || "No Department Assigned"}
                </p>
                <Button variant="primary" className="rounded-pill px-4">
                  Update Profile
                </Button>
              </Col>
              <Col md={8}>
                <Card.Body className="p-4">
                  <h4 className="border-bottom pb-2 mb-4">Professional Information</h4>
                  <Row className="mb-3">
                    <Col md={4} className="text-muted">Email</Col>
                    <Col md={8}>{doctor.email}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="text-muted">Phone</Col>
                    <Col md={8}>{doctor.phone}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="text-muted">Gender</Col>
                    <Col md={8}>{doctor.gender}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="text-muted">Role</Col>
                    <Col md={8}>{doctor.role}</Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}
      </div>
    </>
  );
};

export default DoctorProfile;
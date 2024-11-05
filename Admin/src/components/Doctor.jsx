import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { context } from '../main';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Doctor = () => {
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(context);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch("http://localhost:8080/api/v1/user/doctors", {
           method:'GET',
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            },
            credentials:'include'
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Response:", data.doctors);
          setDoctor(data.doctors);
        } catch (error) {
          console.log("Error fetching doctors:", error.message);
          toast.error("Error fetching doctors: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctor();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container fluid style={{ height: "100vh", maxWidth: "100vw",backgroundColor:"lightslategrey"}}>
      <Row style={{ marginLeft: "290px" }}>
        <h1 className="text-center text-dark" style={{ fontFamily: 'initial', fontSize: "35px", fontWeight: "bold" }}>
          These All Doctors We have!
        </h1>
        {loading ? (
          <h1 className="text-center text-danger" style={{ fontSize: '45px', fontWeight: "bold" }}>Loading...</h1>
        ) : (
          doctor.length === 0 ? (
            <h1 className="text-center text-dark" style={{ fontSize: "65px", fontWeight: "bold" }}>No Doctor Found</h1>
          ) : (
            doctor.map((doc) => (
              <Col sm={12} md={6} lg={4} key={doc.id}>
                <div className="doctor-card">
                  <Card style={{ width: '20rem' }}>
                    <Card.Img
                      variant="top"
                      src={doc.docAvatar ? doc.docAvatar.url : 'fallback-image-url'} // Fallback image if avatar is missing
                      alt='Doctor Avatar'
                    />
                    <Card.Body>
                      <Card.Title>{doc.firstname} {doc.lastname}</Card.Title>
                      <p style={{fontWeight:"bold"}}>Email: <span className='mb-2 text-muted'>{doc.email}</span></p>
                      <p style={{fontWeight:"bold"}}>Phone: <span className='mb-2 text-muted'>{doc.phone}</span></p>
                      <p style={{fontWeight:"bold"}}>Gender: <span className='mb-2 text-muted'>{doc.gender}</span></p>
                      <p style={{fontWeight:"bold"}}>Department: <span className='mb-2 text-muted'>{doc.doctordepartment}</span></p>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))
          )
        )}
      </Row>
    </Container>
  );
};

export default Doctor;

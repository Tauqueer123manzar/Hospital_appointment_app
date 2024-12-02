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
    <Container fluid style={{ height: "auto", width: "100%",backgroundColor:"lightslategrey",overflowX:"hidden",overflowY:"scroll",scrollbarWidth:"none",paddingBottom:"10px"}}>
      <Row style={{ marginLeft: "290px" }}>
        <h1 className="text-center text-dark mt-3" style={{ fontFamily: 'initial', fontSize: "30px", fontWeight: "bold" }}>
        We have all these doctors!
        </h1>
        {loading ? (
          <h1 className="text-center text-danger" style={{ fontSize: '45px', fontWeight: "bold" }}>Loading...</h1>
        ) : (
          doctor.length === 0 ? (
            <h1 className="text-center text-dark" style={{ fontSize: "45px", fontWeight: "bold" }}>No Doctor Found</h1>
          ) : (
            doctor.map((doc) => (
              <Col sm={12} md={6} lg={4} key={doc.id}>
                <div className="doctor-card mt-2">
                  <Card style={{ width: '21rem'}}>
                    <Card.Img
                      variant="top"
                      src={doc.docAvatar ? doc.docAvatar.url : 'fallback-image-url'}
                      alt='Doctor Avatar'
                      style={{height:'220px',width:"100%"}}
                    />
                    <Card.Body>
                      <Card.Title><span style={{fontWeight:"bold",marginBottom:"10px"}}>Name: </span>{doc.firstname} {doc.lastname}</Card.Title>
                      <p style={{fontWeight:"bold"}}>Email: <span className='mb-1 text-muted'>{doc.email}</span></p>
                      <p style={{fontWeight:"bold"}}>Phone: <span className='mb-1 text-muted'>{doc.phone}</span></p>
                      <p style={{fontWeight:"bold"}}>Gender: <span className='mb-1 text-muted'>{doc.gender}</span></p>
                      <p style={{fontWeight:"bold"}}>Department: <span className='mb-1 text-muted'>{doc.doctordepartment}</span></p>
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

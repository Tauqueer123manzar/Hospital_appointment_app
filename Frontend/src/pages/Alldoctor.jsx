import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import Doctors from '../components/Doctors';
import Footer from '../components/Footer';
import '../App.css';

const Alldoctor = () => {
  const department = ['All', 'Cardiology', 'Neurology', 'Radiology', 'ENT', 'Orthopedics', 'Dermatology', 'Therapy', 'Pediatrics', 'Oncology', 'Physician'];
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  return (
    <>
      <Topbar />
      <Container fluid style={{ maxWidth: '100%', maxHeight: '100%' }}>
        <Row>
          <Col xs={12} md={6} lg={3} style={{ marginTop: '100px' }}>
            <p className='fw-2 text-center' style={{ fontFamily: 'initial' }}>
              Browse through the doctors specialist
            </p>
            <h3 style={{ fontFamily: 'initial', color: 'blue' }} className='text-center'>
              Filter the Doctors
            </h3>
            <hr style={{ borderBottom: '1px solid blue' }} />
            <Row>
              {department.map((dept, index) => (
                <Col xs={12} key={index} className='d-flex justify-content-center align-items-center mb-2'>
                  <Button
                    variant={selectedDepartment === dept ? 'primary' : 'outline-primary'}
                    onClick={() => setSelectedDepartment(dept)}
                    style={{ width: '250px' }}
                  >
                    {dept}
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={12} md={6} lg={9} style={{ marginTop: '65px' }}>
            <Doctors selectedDepartment={selectedDepartment} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Alldoctor;
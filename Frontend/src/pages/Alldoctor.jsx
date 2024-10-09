import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Topbar from '../components/Topbar'
import Doctors from '../components/Doctors'
import Footer from '../components/Footer'
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
import '../App.css'
const Alldoctor = () => {
  const department = ['All', 'Cardiology', 'Neurology', 'Radiology', 'ENT', 'Orthopedics', 'Dermatology', 'Therapy', 'Pediatrics', 'Oncology', 'Physician'];
  const doctorsData = [
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
      description: "Physician",
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
    {
      id: 17,
      image: doctor5,
      title: "Available",
      name: "Dr. Richard James",
      description: "Therapy",
    },
  ];
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  //Filter doctors based on selected department
  const filteredDoctors = setSelectedDepartment === 'All'
    ? doctorsData : doctorsData.filter((doctor) => doctor.department === setSelectedDepartment);
  return (
    <>
      <Topbar />
      <Container fluid style={{ maxWidth: "100%", maxHeight: "100%" }}>
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
                    block
                    style={{width:"250px"}}
                  >
                    {dept}
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={12} md={6} lg={9} style={{ marginTop: "65px" }}>
            <Doctors doctors={filteredDoctors} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default Alldoctor

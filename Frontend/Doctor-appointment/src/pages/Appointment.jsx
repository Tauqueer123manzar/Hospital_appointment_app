import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import image from '../assets/signupheader (1).png';
import Footer from '../components/Footer';
import '../App.css'
const Appointment = () => {

  const [dob, setDob] = useState('');
  const [appointment, setAppointment] = useState('');

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  return (
    <>
    <Topbar/>
    <Container fluid style={{maxWidth:"100%",maxHeight:"100vh",padding:0,margin:0}}>
      <div className='box-1' style={{width:"100%"}}>
        <Row >
          <Col xs={12} lg={4} md={6} className=''>
            <h1 style={{ fontFamily: "inherit", fontWeight: "700" }} className='mt-5 p-4 animate__animated animate__fadeInLeft'>Schedule Your Appointment | EasyCare clinic consult</h1>
            <p className='p-4'>EasyCare clinic, founded in 1985, has been a cornerstone of medical excellence and compassionate care in our community for nearly four decades. Nestled in the heart of downtown, our state-of-the-art facility is renowned for its commitment to delivering top-tier healthcare services to patients from all walks of life.</p>
          </Col>

          <Col xs={12} lg={8} md={6} className='d-flex justify-content-center align-items-center animate__animated animate__fadeInRight'>
            <img src={image} width={550} height={450} />
          </Col>
        </Row>

        <Row className='d-flex justify-content-center align-items-center'>
          <h1 className='p-5' style={{ fontWeight: "bold" }}>Appointemnts</h1>
          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='firstname'>
              <Form.Control
                required
                type='text'
                placeholder='First Name'
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='lastname'>
              <Form.Control
                required
                type='text'
                placeholder='Last Name'
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='email'>
              <Form.Control
                required
                type='email'
                placeholder='Email'
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='mobile'>
              <Form.Control
                required
                type='Number'
                placeholder='Mobile Number'
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='pincode'>
              <Form.Control
                required
                type='Number'
                placeholder='Pin code'
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='dob'>
              <Form.Control
                required
                type='date - Date of Birth'
                placeholder='Date of Birth'
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='gender'>
              <Form.Select
                required
                style={{ padding: "12px", maxWidth: "auto" }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='date'>
              <Form.Control
                required
                type='Date'
                placeholder='Appointment Date'
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='date'>
              <Form.Select
                required
                style={{ padding: "12px", maxWidth: "auto" }}
              >
                <option value="">Select Department</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="ENT">ENT</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={5}>
            <Form.Group className='mb-3 p-2' controlId='date'>
              <Form.Select
                required
                style={{ padding: "12px", maxWidth: "auto" }}
              >
                <option value="">Select Doctor</option>
                <option value="Mahes">Dr Mahesh</option>
                <option value="Rahman">Dr K.Rahman</option>
              </Form.Select>
            </Form.Group>
          </Col>


          <Col xs={12} md={6} lg={10}>
            <Form.Group className='mb-3 p-2' controlId='address'>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder='Address'
              >
              </Form.Control>
            </Form.Group>
          </Col>

          <div className='d-flex justify-content-center align-items-center mb-3 p-2 w-100'>
            <Button variant='primary'>
              GET APPOINTMENT
            </Button>
          </div>
        </Row>
        <hr style={{ margin: 0, border: "1px solid black" }} />
      </div>
      <Footer />
    </Container>
    </>
  )
}

export default Appointment

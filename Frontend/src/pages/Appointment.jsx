import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import image from '../assets/signupheader (1).png';
import Footer from '../components/Footer';
import '../App.css'
const Appointment = () => {

  const [formData, setFormData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    gender:"",
    appointmentDate:"",
    department:"",
    doctor:""
  });

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical_Therapy",
    "Dermatology",
    "ENT",
  ];

  const doctorsArray={
    Pediatrics:["Dr. A Sharma", "Dr. S Verma"],
    Orthopedics:["Dr. K Rahman", "Dr. M patil"],
    Cardiology:["Dr. P Kumar", "Dr. S Singh"],
    Neurology:["Dr. R Gupta", "Dr. A Khan"],
    Oncology:["Dr. N Bose","Dr. A Khan"],
    Radiology:["Dr. S Shukla","Dr . K Raees"],
    Physical_Therapy:["Dr. S srivastav","Dr .K Patel"],
    Dermatology:["Dr. N Kumar","Dr . Kaleem"],
    ENT:["Dr. T Mehta","Dr. H Iyer"]
  };

  const handlechange=(e)=>{
    const{name,value}=e.target;
    setFormData({...formData,[name]:value});
  }

  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log("Form Submitted",formData);
  }

  return (
    <>
    <Topbar/>
    <Container fluid style={{maxWidth:"100%",maxHeight:"100vh",padding:0}}>
      <div className='box-1' style={{width:"100%"}}>
        <Row>
          <Col xs={12} lg={4} md={6} className='mt-2'>
            <h1 style={{ fontFamily: "inherit", fontWeight: "700" }} className='mt-5 p-4 animate__animated animate__fadeInLeft'>Schedule Your Appointment | EasyCare clinic consult</h1>
            <p className='p-4'>EasyCare clinic, founded in 1985, has been a cornerstone of medical excellence and compassionate care in our community for nearly four decades. Nestled in the heart of downtown, our state-of-the-art facility is renowned for its commitment to delivering top-tier healthcare services to patients from all walks of life.</p>
          </Col>

          <Col xs={12} lg={8} md={6} className='d-flex justify-content-center animate__animated animate__fadeInRight mt-2'>
            <img src={image} width={550} height={450} alt='Appointment banner'/>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center align-items-center mb-4 mt-4' style={{maxHeight:"800px",maxWidth:"100%"}}>
          <Col xs={12} md={8} lg={6}>
          <h1 className='text-center' style={{ fontWeight: "bold" }}>Appointement Booking</h1>
          <Form className='shadow-lg p-5 m-3 bg-white rounded mt-3' onSubmit={handlesubmit}>
            <Form.Group className='mb-2 p-1 ' controlId='firstname'>
              <Form.Control
                required
                type='text'
                name="firstname"
                placeholder='First Name'
                value={formData.firstname}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>


            <Form.Group className='mb-2 p-1' controlId='lastname'>
              <Form.Control
                required
                type='text'
                name="lastname"
                placeholder='Last Name'
                value={formData.lastname}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>


            <Form.Group className='mb-2 p-1' controlId='email'>
              <Form.Control
                required
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className='mb-2 p-1' controlId='mobile'>
              <Form.Control
                required
                type='Number'
                name='mobile'
                placeholder='Mobile Number'
                value={formData.mobile}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className='mb-2 p-1' controlId='gender'>
              <Form.Select
                required
                name='gender'
                value={formData.gender}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-2 p-1' controlId='appointmentdate'>
              <Form.Control
                required
                type='Date'
                name='appointmentDate'
                value={formData.appointmentDate}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
              </Form.Control>
            </Form.Group>


            <Form.Group className='mb-2 p-1' controlId='department'>
              <Form.Select
                required
                name='department'
                value={formData.department}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
                <option value="">Select Department</option>
               {departmentsArray.map((department)=>{
                 return <option key={department} value={department}>{department}</option>
               })}
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-2 p-1' controlId='doctor'>
              <Form.Select
                required
                name='doctor'
                value={formData.doctor}
                onChange={handlechange}
                style={{ padding: "12px", maxWidth: "auto" }}
              >
                <option value="">Select Doctor</option>
               {
                doctorsArray[formData.department]?.map((doctor)=>{
                  return <option key={doctor} value={doctor}>{doctor}</option>
                })
               }
              </Form.Select>
            </Form.Group>

          <div className='d-flex justify-content-center align-items-center mb-3 p-2 w-100'>
            <Button variant='primary' type='submit' className='w-100'>
              GET APPOINTMENT
            </Button>
          </div>
          </Form>
          </Col>
        </Row>
        <hr style={{ margin: 0, border: "1px solid black" }} />
      </div>
      <Footer />
    </Container>
    </>
  )
}

export default Appointment

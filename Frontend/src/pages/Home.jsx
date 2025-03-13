import React from 'react';
import Hero from '../components/Hero';
import Department from '../components/Department';
import heroimage from '../assets/hero (1).png';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { Typewriter } from 'react-simple-typewriter';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import doctor from '../assets/appointment-doc-img.png';
import Register from '../pages/Register';
import '../App.css';

const Home = () => {
  const valueData = [
    {
      id: 1,
      title: "Expertise",
      image: "https://cdn-icons-png.flaticon.com/256/1322/1322236.png",
      description: "All our doctors, nurses, and non-medical staff are committed to being the most skilled and knowledgeable in their respective fields. We invest in the most advanced and innovative treatments.",
    },
    {
      id: 2,
      title: "Excellence",
      image: "https://cdn-icons-png.flaticon.com/128/5377/5377594.png",
      description: "We strive for excellence in every aspect of your experience, from providing state-of-the-art facilities and compassionate guidance to delivering the highest quality care and exceptional medical outcomes.",
    },
    {
      id: 3,
      title: "Empathy",
      image: "https://cdn-icons-png.flaticon.com/128/10285/10285163.png",
      description: "Patients are more than medical cases—they are individuals with unique needs and concerns. We foster a culture of empathy among our staff to ensure every patient feels understood and supported.",
    },
    {
      id: 4,
      title: "Trust",
      image: "https://cdn-icons-png.flaticon.com/128/18187/18187769.png",
      description: "We believe that trust is earned, not given, and we work tirelessly to uphold the confidence our clients place in us. By fostering trust, we create a secure environment for healing.",
    },
  ];

  return (
    <div>
      <Topbar />
      <Hero
        title={
          <Typewriter
            words={["Welcome to EasyCare Clinic Your Trusted Healthcare Provider."]}
            loop={0}
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={45}
            delaySpeed={1000}
          />
        }
        imageurl={heroimage}
      />

      {/* Highlight Section */}
      <div className="highlight bg-blue p-3 p-md-5">
        <Container>
          <Row className="justify-content-center text-center g-4">
            <Col xs={6} md={3} className="mb-4 mb-md-0">
              <div className="d-flex flex-column align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/128/8815/8815112.png" alt="Doctors" className="img-fluid" style={{ width: '60px' }} />
                <h1 className="mt-3">20+</h1>
                <p className="fs-5 fw-bold">Doctors</p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-4 mb-md-0">
              <div className="d-flex flex-column align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/128/3649/3649789.png" alt="Happy Clients" className="img-fluid" style={{ width: '60px' }} />
                <h1 className="mt-3">86,00+</h1>
                <p className="fs-5 fw-bold">Happy Clients</p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-4 mb-md-0">
              <div className="d-flex flex-column align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/128/18167/18167186.png" alt="Departments" className="img-fluid" style={{ width: '60px' }} />
                <h1 className="mt-3">10+</h1>
                <p className="fs-5 fw-bold">Departments</p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-4 mb-md-0">
              <div className="d-flex flex-column align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/128/1364/1364834.png" alt="Surgeries" className="img-fluid" style={{ width: '60px' }} />
                <h1 className="mt-3">200+</h1>
                <p className="fs-5 fw-bold">Surgeries</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Department />

      {/* Values Section */}
      <Container fluid className="p-3 p-md-5">
        <h1 className="text-center mt-5 display-4 fw-bold">Our Values</h1>
        <p className="text-center fs-5">Compassion, Trust, and Excellence in Care</p>
        <p className="text-center fs-6 mx-auto" style={{ maxWidth: '800px' }}>
          At EasyCare, our values define who we are and how we serve. We are committed to providing exceptional healthcare, built on a foundation of trust, empathy, expertise, and excellence. Our team is dedicated to upholding the highest standards of medical care and innovation, ensuring patients feel understood, respected, and supported throughout their journey. We believe that trust is earned, not given, and work every day to foster confidence in the care we provide.
        </p>
        <Row className="justify-content-center p-3 p-md-5 g-4">
          {valueData.map((value) => (
            <Col xs={12} sm={6} md={6} lg={3} key={value.id}>
              <Card className="h-100 shadow-sm border-1">
                <Card.Img variant="top" src={value.image} className="p-4" style={{fontSize:"20px"}} />
                <Card.Body className="text-center">
                  <Card.Title className="fs-5 fw-bold">{value.title}</Card.Title>
                  <Card.Text className="fs-6">{value.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Appointment Section */}
      <Container fluid className="p-3 p-md-5">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} lg={6} className="text-center text-lg-start">
            <h1 className="display-5 fw-bold">Book Appointment With 100+ Trusted Doctors</h1>
            <button className="btn btn-light btn-lg mt-4" style={{ borderRadius: '50px' }}>
              <a href="/register" className="text-decoration-none text-dark">Create Account</a>
            </button>
          </Col>
          <Col xs={12} lg={6} className="d-flex justify-content-center align-items-center mt-4 mt-lg-0">
            <img src={doctor} alt="Doctor" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
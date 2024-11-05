import React from 'react'
import Hero from '../components/Hero';
import Department from '../components/Department';
import heroimage from '../assets/hero (1).png';
import Topbar from '../components/Topbar'
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
      description: "All our doctors, nurses and non-medical staff are committed to being the most skilled and knowledgeable in their respective fields. We invest in the most advanced and innovative treatments."
    },
    {
      id: 2,
      title: "Excellence",
      image: "https://cdn-icons-png.flaticon.com/128/5377/5377594.png",
      description: "We strive for excellence in every aspect of your experience right from providing state of the art facilities, compassionate guidance, highest quality care to exceptional medical outcomes."
    },
    {
      id: 3,
      title: "Empathy",
      image: "https://cdn-icons-png.flaticon.com/128/10285/10285163.png",
      description: "Patients are more than a medical case - they are individuals with unique needs and concerns. We foster a culture of empathy among our staff,understood and supported."
    },
    {
      id: 4,
      title: "Trust",
      image: "https://cdn-icons-png.flaticon.com/128/18187/18187769.png",
      description: "We believe that trust is earned, not given, and we work tirelessly to uphold the confidence our clients place in us.By fostering trust, we create a secure environment"
    }
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
      <div className='heighlight  bg-blue p-5 style={{width:"100%",height:"100%"}}'>
        <div className=' heighlight-container text-center d-flex justify-content-center align-items-center' style={{gap:"150px"}}>
          <div className="container-ele d-flex ">
            <div>
              <img src='https://cdn-icons-png.flaticon.com/128/8815/8815112.png'></img>
            </div>
            <div className='mt-3'>
              <h1>20+</h1>
              <p style={{fontSize:"25px",fontWeight:"bold"}}>Doctors</p>
            </div>
          </div>
          <div className="container-ele d-flex">
            <div>
              <img src='https://cdn-icons-png.flaticon.com/128/3649/3649789.png'></img>
            </div>
            <div className='mt-3 p-1'>
              <h1>86,00+</h1>
              <p style={{fontSize:"25px",fontWeight:"bold"}}>Happy Clients</p>
            </div>
          </div>

          <div className="container-ele d-flex">
            <div>
              <img src='https://cdn-icons-png.flaticon.com/128/18167/18167186.png'></img>
            </div>
            <div className='mt-3 p-1'>
              <h1>10+</h1>
              <p style={{fontSize:"25px",fontWeight:"bold"}}>Department</p>
            </div>
          </div>

          <div className="container-ele d-flex">
            <div>
              <img src='https://cdn-icons-png.flaticon.com/128/1364/1364834.png'></img>
            </div>
            <div className='mt-3 p-1'>
              <h1>200+</h1>
              <p style={{fontSize:"25px",fontWeight:"bold"}}>Surgeries</p>
            </div>
          </div>
        </div>
      </div>
      <Department />
      <Container fluid>
        <h1 className='text-center mt-5' style={{ fontFamily: "initial", fontSize: "45px", fontWeight: "bold" }}>Our Values</h1>
        <p className='text-center'>Compassion, Trust, and Excellence in Care</p>
        <p className='text-center' style={{fontFamily:"initial"}}>At EasyCare, our values define who we are and how we serve. We are committed to providing exceptional healthcare, built on a foundation of trust, empathy, expertise, and excellence.<br></br>Our team is dedicated to upholding the highest standards of medical care and innovation, ensuring patients feel understood, respected, and supported throughout their journey.<br></br>We believe that trust is earned, not given, and work every day to foster confidence in the care we provide. </p>
        <Row className="justify-content-center p-5">
          {valueData.map((value) => (
            <Col sm={12} md={6} lg={3} key={value.id} className="mb-4">
              <Card style={{ width: '20rem', border: "1.5px dashed pink" }} className='shadow box1'>
                <Card.Img src={value.image} width={550} height={200} className='p-5' />
                <Card.Body>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Text>{value.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container style={{ width: "100%", height: "70%" }} className='d-flex justify-content-center align-items-center mb-5'>
        <div className='box mt-5' style={{ height: "400px", width: "90%", borderRadius: "10px", backgroundColor: "rgba(95, 111, 255, 1)" }}>
          <Row>
            <Col sm={12} lg={6} md={6}>
              <h1 className='text-center mt-5' style={{ fontFamily: "initial" }}>Book Appointment
                With 100+ Trusted Doctors</h1>
              <button className='bg-white d-flex justify-content-center align-items-center' style={{ width: "230px", height: "65px", borderRadius: "50px", marginLeft: "120px", marginTop: "40px" }}><a href='/register' className='text-decoration-none text-dark'>Create account</a></button>
            </Col>
            <Col sm={12} lg={5} md={6} className='position-relative d-flex justify-content-center align-items-center'>
              <img src={doctor} width={400} height={400} className='position-absolute' style={{ marginTop: "130px" }} />
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default Home


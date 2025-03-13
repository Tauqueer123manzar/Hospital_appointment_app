import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import hospital from '../assets/hospital.jpg';
import Ent from '../assets/ent.jpg';
import Cardiology from '../assets/cardio.jpg';
import Neurology from '../assets/neuro.jpg';
import Radiology from '../assets/radio.jpg';
import Orthopedics from '../assets/ortho.jpg';
import Pediatrics from '../assets/pedia.jpg';
import Oncology from '../assets/onco.jpg';
import Therapy from '../assets/therapy.jpg';
import Dermatology from '../assets/derma.jpg';
import Footer from '../components/Footer';
import { MdStarRate } from "react-icons/md";
import image1 from '../assets/Group 8.jpg';
import { Typewriter } from 'react-simple-typewriter';
import '../App.css'
const Services = () => {
  const servicedata = [
    { id: 1, name: "CARDIOLOGY", image: Cardiology, description: " our Cardiology Department is dedicated to the prevention, diagnosis, and treatment of heart-related conditions." },
    { id: 2, name: "NEUROLOGY", image: Neurology, description: "our Neurology Department is dedicated to diagnosing and treating disorders of the brain, spine, and nervous system. " },
    { id: 3, name: "RADIOLOGY", image: Radiology, description: " our Radiology Department plays a crucial role in diagnosing and monitoring various medical conditions." },
    { id: 4, name: "ENT DOCTOR", image: Ent, description: "our ENT (Otolaryngology) Department specializes in diagnosing and treating conditions related to the ear, nose, and throat." },
    { id: 5, name: "ORTHOPEDICS", image: Orthopedics, description: "our Orthopedic Department is committed to providing comprehensive care for conditions affecting the bones, joints." },
    { id: 6, name: "THERAPY", image: Therapy, description: "our Therapy Department offers a range of rehabilitation services designed to help patients recover from injuries, surgeries." },
    { id: 7, name: "DERMATOLOGY", image: Dermatology, description: "our Dermatology Department is dedicated to the diagnosis and treatment of a wide range of skin, hair." },
    { id: 8, name: "PEDIATRICS", image: Pediatrics, description: " our Pediatrics Department is committed to providing exceptional medical care for children, from newborns." },
    { id: 9, name: "ONCOLOGY", image: Oncology, description: "our Oncology Department is dedicated to providing high-quality care for patients diagnosed with cancer" },
  ];

  return (
    <>
      <Topbar />
      <Container fluid style={{ minWidth: "100%", maxHeight: "100%",background: '#f8f9fa'}}>
        <Row className='mt-5'>
          <Col sm={12} lg={5} md={6}>
          <h1 className='mt-5 p-5' style={{ fontWeight: "700", fontFamily: "initial", fontSize: "45px" }}>
            <Typewriter
                words={['Providing Quality Easycare for a Brighter and Healthy Future.']}
                loop={0}
                cursor='true'
                cursorstyle='_'
                typespeed={80}
                deletedspeed={50}
                delayspeed={2000}
                fontSize="50px"
            />
          </h1>
            <p className='m-5'>At our hospital, we are dedicated to providing exceptional medical care to our patients and their families. Our experienced team of medical professionals, cutting-edge technology, and compassionate approach make us a leader in the healthcare industry</p>
            <Button variant='primary' style={{ width: '250px', height: '45px', marginLeft: "45px" }} className='mt-1'>
              <a href='/appointment' style={{ color: 'white', textDecoration: 'none' }}>
                Appointment
              </a>
            </Button>
          </Col>
          <Col sm={12} lg={7} md={6} className='d-flex justify-content-center align-items-center position-relative' style={{background:"#f8f9fa"}}>
            <img src={hospital} width={750} height={420} className='mt-5' style={{marginLeft:"950"}}/>
            {/* <img src={image1} width={200} height={60} className='image position-absolute' style={{ top: "400px", zIndex: 1 }} /> */}
          </Col>
        </Row>

        <Row>
          <h1 className='mt-3 text-center' style={{ fontSize: "55px", fontFamily: "initial", fontWeight: "bold", color: "rgba(0, 126, 133, 1)" }}>Our Services</h1>
          {
            servicedata.map(service => (
              <Col key={service.id} sm={12} md={6} lg={4} className='p-3'>
                <Card className='servicecard'>
                  <Card.Img variant='top' src={service.image} className="service-image" />
                  <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>{service.name}</Card.Title>
                    <Card.Title style={{ fontSize: "14px", fontFamily: "initial" }}>{service.description}</Card.Title>
                    <Button variant='primary' className='mt-1 w-100'>
                      <a href='/appointment' style={{ color: 'white', textDecoration: 'none' }}>
                        Book Appointment
                      </a>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Row>
          <h1 className='mt-5 text-center' style={{ color: "rgba(0, 126, 133, 1)", fontWeight: "bold", fontFamily: "initial",fontSize:"55px" }}>What our customer say</h1>
          <p className='text-center mt-2'>This is feedback of our customer side</p>
          <Col sm={12} md={6} lg={4} className='p-3'>
            <Card style={{ width: '25rem', marginLeft: "45px", height: "250px",border:"dotted",borderColor:"goldenrod"}}>
              <Card.Body>
                <MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' />
                <Card.Title>Md Tauqueer Manzar</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Sr.Software Enginner</Card.Subtitle>
                <Card.Text>
                  I was impressed with the level of professionalism and personal attention I received at the hospital.
                  The staff was friendly, and the doctors took the time to explain every detail of my eye care procedure.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4} className='p-3'>
            <Card style={{ width: '25rem', height: "250px",border:"dotted",borderColor:"goldenrod"}}>
              <Card.Body>
                <MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate />
                <Card.Title>Janishar Alamr</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Software Engineer</Card.Subtitle>
                <Card.Text>
                  The hospital is equipped with the latest technology, and it shows in the quality of care.
                  I felt comfortable throughout my treatment, and the results were beyond my expectations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4} className='p-3'>
            <Card style={{ width: '25rem', height: "250px",border:"dotted",borderColor:"goldenrod"}}>
              <Card.Body>
                <MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate color='	rgb(204,204,0)' /><MdStarRate />
                <Card.Title>Md Anwar Alam</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Software Enginner</Card.Subtitle>
                <Card.Text>
                  I’ve been visiting this hospital for regular checkups, and I always feel confident in the care I receive.
                  The team is knowledgeable, caring, and always prioritizes the health of their patients.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default Services

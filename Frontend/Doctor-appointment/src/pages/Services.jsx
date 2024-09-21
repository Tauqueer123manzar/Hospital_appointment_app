import React from 'react'
import { Container,Row,Col,Button,Card} from 'react-bootstrap'
import Topbar from '../components/Topbar'
import doctor from '../assets/Group 3.jpg'
import Ent from '../assets/ent.jpg';
import Cardiology from '../assets/cardio.jpg';
import Neurology from '../assets/neuro.jpg';
import Radiology from '../assets/radio.jpg';
import Orthopedics from '../assets/ortho.jpg';
import Pediatrics from '../assets/pedia.jpg';
import Oncology from '../assets/onco.jpg';
import Therapy from '../assets/therapy.jpg';
import Dermatology from '../assets/derma.jpg';
import '../App.css'
import Footer from '../components/Footer';
const Services = () => {
  const servicedata = [
    { id: 1, name: "CARDIOLOGY", image: Cardiology,description:" our Cardiology Department is dedicated to the prevention, diagnosis, and treatment of heart-related conditions."},
    { id: 2, name: "NEUROLOGY", image: Neurology,description:"our Neurology Department is dedicated to diagnosing and treating disorders of the brain, spine, and nervous system. " },
    { id: 3, name: "RADIOLOGY", image: Radiology,description:" our Radiology Department plays a crucial role in diagnosing and monitoring various medical conditions."},
    { id: 4, name: "ENT DOCTOR", image: Ent,description:"our ENT (Otolaryngology) Department specializes in diagnosing and treating conditions related to the ear, nose, and throat."},
    { id: 5, name: "ORTHOPEDICS", image: Orthopedics,description:"our Orthopedic Department is committed to providing comprehensive care for conditions affecting the bones, joints."},
    { id: 6, name: "THERAPY", image: Therapy,description:"our Therapy Department offers a range of rehabilitation services designed to help patients recover from injuries, surgeries."},
    { id: 7, name: "DERMATOLOGY", image: Dermatology,description:"our Dermatology Department is dedicated to the diagnosis and treatment of a wide range of skin, hair." },
    { id: 8, name: "PEDIATRICS", image: Pediatrics,description:" our Pediatrics Department is committed to providing exceptional medical care for children, from newborns." },
    { id: 9, name: "ONCOLOGY", image: Oncology,description:"our Oncology Department is dedicated to providing high-quality care for patients diagnosed with cancer" },
  ];
  return (
    <>
   <Topbar/>
   <Container fluid style={{maxWidth:"100%",maxHeight:"100%"}}>
    <Row>
     <Col sm={12} lg={5} md={6}>
       <h1 className='m-5' style={{fontSize:"45px",fontWeight:"bold",fontFamily:"initial"}}>Providing Quality Easycare for a Brighter and Healthy Future</h1>
       <p className='m-5'>At our hospital, we are dedicated to providing exceptional medical care to our patients and their families. Our experienced team of medical professionals, cutting-edge technology, and compassionate approach make us a leader in the healthcare industry</p>
       <Button variant='primary' style={{ width: '250px', height: '45px',marginLeft:"45px"}} className='mt-1'>
              <a href='/appointment' style={{ color: 'white', textDecoration: 'none' }}>
                Appointment
              </a>
      </Button>
     </Col>
     <Col sm={12} lg={7} md={6} className='d-flex justify-content-center align-items-center'>
      <img src={doctor} width={500} height={490} className='m-3'/>
     </Col>
    </Row>

    <Row>
      <h1 className='mt-3 text-center' style={{fontSize:"55px",fontFamily:"initial",fontWeight:"bold"}}>Our Services</h1>
      <p className='mt-3 text-center' >At Easycare Hospital, we believe in providing specialized, quality healthcare to ensure the well-being of our patients.</p>
      {
        servicedata.map(service =>(
        <Col key={service.id} sm={12} md={6} lg={4} className='p-2'>
          <Card className='servicecard'>
           <Card.Img variant='top' src={service.image} className="service-image"/>
           <Card.Body>
            <Card.Title style={{fontWeight:"bold"}}>{service.name}</Card.Title>
            <Card.Title style={{fontSize:"14px",fontFamily:"initial"}}>{service.description}</Card.Title>
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
    </Container>
    <Footer/>
   </>
  )
}

export default Services

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Ent from '../assets/ent.jpg';
import Cardiology from '../assets/cardio.jpg';
import Neurology from '../assets/neuro.jpg';
import Radiology from '../assets/radio.jpg';
import Orthopedics from '../assets/ortho.jpg';
import Pediatrics from '../assets/pedia.jpg';
import Oncology from '../assets/onco.jpg';
import Therapy from '../assets/therapy.jpg';
import Dermatology from '../assets/derma.jpg';
import '../App.css';
import doctor from '../assets/appointment-doc-img.png';
import Register from '../pages/Register';
import { Container, Row, Col ,Button} from 'react-bootstrap';

const Department = () => {
  const departmentData = [
    { id: 1, name: "CARDIOLOGY", image: Cardiology },
    { id: 2, name: "NEUROLOGY", image: Neurology },
    { id: 3, name: "RADIOLOGY", image: Radiology },
    { id: 4, name: "ENT DOCTOR", image: Ent },
    { id: 5, name: "ORTHOPEDICS", image: Orthopedics },
    { id: 6, name: "THERAPY", image: Therapy },
    { id: 7, name: "DERMATOLOGY", image: Dermatology },
    { id: 8, name: "PEDIATRICS", image: Pediatrics },
    { id: 9, name: "ONCOLOGY", image: Oncology },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 4,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container departments" style={{ backgroundColor: "", maxWidth: "90%", maxHeight: "100%" }}>
      <h2 style={{ fontFamily: "initial", fontWeight: "700" }}>DEPARTMENTS</h2>
      <Carousel
        responsive={responsive}
      >
        {departmentData.map((depart, index) => (
          <div key={depart.id} className="department-card">
            <div className="depart-name text-secondary">{depart.name}</div>
            <img src={depart.image} alt={depart.name} className="depart-image" />
          </div>
        ))}
      </Carousel>
      <Container fluid style={{ width: "100%", height: "70%" }} className='d-flex justify-content-center align-items-center'>
        <div className='box mt-5' style={{ height: "400px", width: "90%", borderRadius: "10px", backgroundColor: "rgba(95, 111, 255, 1)" }}>
          <Row>
           <Col sm={12} lg={6} md={6}>
             <h1 className='text-center mt-5' style={{fontFamily:"initial"}}>Book Appointment 
             With 100+ Trusted Doctors</h1>
             <button className='bg-white d-flex justify-content-center align-items-center' style={{width:"230px",height:"65px",borderRadius:"50px",marginLeft:"120px",marginTop:"40px"}}><a href='/register' className='text-decoration-none text-dark'>Create account</a></button>
           </Col>
           <Col sm={12} lg={5} md={6} className='position-relative d-flex justify-content-center align-items-center'>
            <img src={doctor} width={400} height={400} className='position-absolute' style={{marginTop:"130px"}}/>
           </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Department;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import vectorimg from '../assets/Vector.png';
import background from '../assets/chairBg.png'
import '../App.css'
import 'animate.css'
const Hero = ({ title, imageurl }) => {
  return (
    <Container fluid>
      <div className='hero_section' style={{ width: "100%", maxHeight: "100%" }}>
        <Row
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: "100%", // Adjust height as needed
            marginTop: '0',
            width:"100%" // Removed margin to avoid spacing issues
          }}>
          <Col lg={6} md={6} sm={12}>
            <p style={{ marginTop: "120px", fontWeight: "700", fontSize: "40px", marginLeft: "24px", maxWidth: "600px", lineHeight: "1.2" }}>{title}</p>
            <p style={{ marginTop: "20px", marginLeft: "24px", maxWidth: "500px" }}>Easy care clinic consult is a start-of-the-art facility dedicated to providing comphrensive healthcare hospital, an institution that is built, staffed, and equipped for the diagnosis of disease; for the treatment, both medical and surgical, of the sick and the injured; and for their housing during this process. The modern hospital also often serves as a centre for investigation and for teaching. hospital.A "Medical EasyCare Hospital Appointment" app could streamline the entire appointment scheduling and management process for hospitals and patients.</p>
          </Col>
          <Col className="hero_image" lg={6} md={6} sm={12} style={{
            backgroundImage: `url(${vectorimg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img src={imageurl} alt='missing image' style={{ position: 'relative', zIndex: 1 ,marginTop: "75px"}} />
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Hero;

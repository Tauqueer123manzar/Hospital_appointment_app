import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import vectorimg from '../assets/Vector.png';
import background from '../assets/chairBg.png';
import '../App.css';

const Hero = ({ title, imageurl }) => {
  return (
    <Container fluid className="p-0">
      <div className="hero_section">
        <Row
          className="hero_row"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', // Full viewport height
            width: '100%',
            margin: '0',
          }}
        >
          {/* Text Section */}
          <Col lg={6} md={12} sm={12} className="d-flex flex-column justify-content-center align-items-start p-4">
            <h1
              className="hero_title"
              style={{
                fontWeight: '700',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', // Responsive font size
                lineHeight: '1.2',
                marginBottom: '20px',
              }}
            >
              {title}
            </h1>
            <p
              className="hero_description"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', // Responsive font size
                maxWidth: '600px',
                lineHeight: '1.6',
              }}
            >
              Easy care clinic consult is a state-of-the-art facility dedicated to providing comprehensive healthcare. A hospital is an institution that is built, staffed, and equipped for the diagnosis of disease; for the treatment, both medical and surgical, of the sick and the injured; and for their housing during this process. The modern hospital also often serves as a centre for investigation and for teaching. A "Medical EasyCare Hospital Appointment" app could streamline the entire appointment scheduling and management process for hospitals and patients.
            </p>
          </Col>

          {/* Image Section */}
          <Col
            lg={6}
            md={12}
            sm={12}
            className="hero_image_col d-flex justify-content-center align-items-center p-4"
            style={{
              backgroundImage: `url(${vectorimg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <img
              src={imageurl}
              alt="missing image"
              className="hero_image"
              style={{
                maxWidth: '100%',
                height: 'auto',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Hero;
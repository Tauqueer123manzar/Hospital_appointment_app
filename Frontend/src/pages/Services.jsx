import React, { useState } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
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
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter';
import '../App.css';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const serviceData = [
    { 
      id: 1, 
      name: "Cardiology", 
      image: Cardiology, 
      description: "Our Cardiology Department is dedicated to the prevention, diagnosis, and treatment of heart-related conditions.",
      icon: "❤️"
    },
    { 
      id: 2, 
      name: "Neurology", 
      image: Neurology, 
      description: "Our Neurology Department is dedicated to diagnosing and treating disorders of the brain, spine, and nervous system.",
      icon: "🧠"
    },
    { 
      id: 3, 
      name: "Radiology", 
      image: Radiology, 
      description: "Our Radiology Department plays a crucial role in diagnosing and monitoring various medical conditions.",
      icon: "📷"
    },
    { 
      id: 4, 
      name: "ENT Specialist", 
      image: Ent, 
      description: "Our ENT Department specializes in diagnosing and treating conditions related to the ear, nose, and throat.",
      icon: "👂"
    },
    { 
      id: 5, 
      name: "Orthopedics", 
      image: Orthopedics, 
      description: "Our Orthopedic Department provides comprehensive care for conditions affecting the bones and joints.",
      icon: "🦴"
    },
    { 
      id: 6, 
      name: "Therapy", 
      image: Therapy, 
      description: "Our Therapy Department offers rehabilitation services to help patients recover from injuries and surgeries.",
      icon: "🏋️"
    },
    { 
      id: 7, 
      name: "Dermatology", 
      image: Dermatology, 
      description: "Our Dermatology Department treats a wide range of skin, hair, and nail conditions.",
      icon: "💆"
    },
    { 
      id: 8, 
      name: "Pediatrics", 
      image: Pediatrics, 
      description: "Our Pediatrics Department provides exceptional medical care for children from newborns to adolescents.",
      icon: "👶"
    },
    { 
      id: 9, 
      name: "Oncology", 
      image: Oncology, 
      description: "Our Oncology Department provides high-quality care for patients diagnosed with cancer.",
      icon: "🦋"
    },
  ];

  const filteredServices = serviceData.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Topbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-text mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                <Typewriter
                  words={['Providing Quality Healthcare for a Brighter, Healthier Future']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h1>
              <p className="lead mb-4">
                At our hospital, we are dedicated to providing exceptional medical care with experienced professionals, cutting-edge technology, and a compassionate approach.
              </p>
              <Button variant="primary" size="lg" className="rounded-pill px-4 py-2">
                <a href="/appointment" className="text-white text-decoration-none d-flex align-items-center">
                  Book Appointment <FaArrowRight className="ms-2" />
                </a>
              </Button>
            </Col>
            <Col lg={6}>
              <div className="hero-image-container">
                <img 
                  src={hospital} 
                  alt="Hospital" 
                  className="img-fluid rounded shadow-lg" 
                />
                <div className="hero-image-overlay"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold text-primary mb-3">Our Medical Services</h2>
              <p className="lead text-muted">Comprehensive healthcare services for all your needs</p>
              
              <div className="search-box mx-auto mt-4">
                <Form.Group controlId="searchServices">
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ps-5 py-3 rounded-pill border-0 shadow-sm"
                    />
                    <FaSearch className="search-icon" />
                  </div>
                </Form.Group>
              </div>
            </Col>
          </Row>

          <Row>
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <Col key={service.id} xs={12} md={6} lg={4} className="mb-4">
                  <Card className="service-card h-100 border-0 shadow-sm overflow-hidden">
                    <div className="service-img-container">
                      <Card.Img 
                        variant="top" 
                        src={service.image} 
                        alt={service.name}
                        className="service-image"
                      />
                    </div>
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="service-icon me-3">{service.icon}</span>
                        <Card.Title className="mb-0 fw-bold">{service.name}</Card.Title>
                      </div>
                      <Card.Text className="text-muted mb-4">
                        {service.description}
                      </Card.Text>
                      <Button 
                        variant="outline-primary" 
                        className="w-100 rounded-pill d-flex align-items-center justify-content-center"
                      >
                        <a href="/appointment" className="text-decoration-none">
                          Book Now <FaArrowRight className="ms-2" />
                        </a>
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <h4 className="text-muted">No services found matching your search</h4>
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery("")}
                  className="text-primary"
                >
                  Clear search
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold text-primary mb-3">Patient Testimonials</h2>
              <p className="lead text-muted">Hear what our patients say about their experience</p>
            </Col>
          </Row>

          <Row>
            {[
              {
                name: "Md Tauqueer Manzar",
                role: "Sr. Software Engineer",
                rating: 5,
                text: "I was impressed with the level of professionalism and personal attention I received. The staff was friendly, and the doctors took the time to explain every detail of my procedure."
              },
              {
                name: "Janishar Alam",
                role: "Software Engineer",
                rating: 4,
                text: "The hospital is equipped with the latest technology, and it shows in the quality of care. I felt comfortable throughout my treatment, and the results were beyond my expectations."
              },
              {
                name: "Md Anwar Alam",
                role: "Software Engineer",
                rating: 4,
                text: "I've been visiting this hospital for regular checkups, and I always feel confident in the care I receive. The team is knowledgeable, caring, and always prioritizes patient health."
              }
            ].map((testimonial, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm testimonial-card">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      {[...Array(5)].map((_, i) => (
                        <MdStarRate 
                          key={i} 
                          color={i < testimonial.rating ? "gold" : "#ddd"} 
                          size={20} 
                        />
                      ))}
                    </div>
                    <Card.Text className="mb-4 fst-italic">
                      "{testimonial.text}"
                    </Card.Text>
                    <div className="d-flex align-items-center">
                      <div className="avatar-placeholder bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default Services
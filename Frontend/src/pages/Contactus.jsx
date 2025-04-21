import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Topbar from '../components/Topbar';
import hospital from '../assets/Rectangle 1548.jpg';
import MessageForm from '../components/MessageForm';
import Footer from '../components/Footer';
import { IoLocationSharp, IoTime, IoCall } from "react-icons/io5";
import { FaClinicMedical, FaAmbulance } from "react-icons/fa";
import '../App.css';

const Contactus = () => {
    return (
        <>
            <Topbar />
            
            {/* Hero Banner */}
            <div className='contact-hero'>
                <div className='hero-overlay'>
                    <Container>
                        <div className='hero-content'>
                            <h1 className='hero-title'>Contact Us</h1>
                            <p className='hero-subtitle'>We're here to help and answer any questions you may have</p>
                        </div>
                    </Container>
                </div>
            </div>

            {/* Contact Content */}
            <Container className='contact-container'>
                <Row className='justify-content-center'>
                    <Col xs={12} className='text-center mb-5'>
                        <h2 className='section-title'>Get In Touch</h2>
                        <p className='section-description'>Have questions or need more information? Reach out to us!</p>
                    </Col>
                </Row>

                <Row className='g-4'>
                    {/* Contact Information */}
                    <Col lg={5} md={6} className='mb-4'>
                        <div className='contact-info-card'>
                            <div className='contact-item'>
                                <div className='contact-icon'>
                                    <IoLocationSharp />
                                </div>
                                <div className='contact-details'>
                                    <h3>Our Locations</h3>
                                    <p>Banjara Hills, Hyderabad</p>
                                    <p>Gachibowli, Hyderabad</p>
                                </div>
                            </div>

                            <div className='contact-item'>
                                <div className='contact-icon'>
                                    <IoCall />
                                </div>
                                <div className='contact-details'>
                                    <h3>Call Us</h3>
                                    <p>1800 123 456 (Toll Free)</p>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>

                            <div className='contact-item'>
                                <div className='contact-icon'>
                                    <FaAmbulance />
                                </div>
                                <div className='contact-details'>
                                    <h3>24/7 Emergency</h3>
                                    <p>Banjara Hills: +91-7549200441</p>
                                    <p>Gachibowli: +91-8765432687</p>
                                </div>
                            </div>

                            <div className='contact-item'>
                                <div className='contact-icon'>
                                    <IoTime />
                                </div>
                                <div className='contact-details'>
                                    <h3>OPD Timings</h3>
                                    <p>Monday - Saturday</p>
                                    <p>9:00 AM - 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Contact Form */}
                    <Col lg={7} md={6}>
                        <div className='contact-form-wrapper'>
                            <h3 className='form-title'>Send Us a Message</h3>
                            <MessageForm />
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Map Section */}
            <div className='map-section'>
                <Container>
                    <Row>
                        <Col xs={12} className='text-center mb-4'>
                            <h2 className='section-title'>Our Locations</h2>
                        </Col>
                    </Row>
                    <Row className='g-4'>
                        <Col md={6}>
                            <div className='map-container'>
                                <iframe 
                                    title="Banjara Hills Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.263318574356!2d78.45166131535574!3d17.44890550561293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x5c3ef8c8d9a6f7a1!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                    allowFullScreen="" 
                                    loading="lazy"
                                    className='google-map'
                                ></iframe>
                                <div className='map-overlay'>
                                    <FaClinicMedical className='hospital-icon' />
                                    <h4>Banjara Hills Branch</h4>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='map-container'>
                                <iframe 
                                    title="Gachibowli Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.263318574356!2d78.35166131535574!3d17.44890550561293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x5c3ef8c8d9a6f7a1!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                    allowFullScreen="" 
                                    loading="lazy"
                                    className='google-map'
                                ></iframe>
                                <div className='map-overlay'>
                                    <FaClinicMedical className='hospital-icon' />
                                    <h4>Gachibowli Branch</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </>
    )
}

export default Contactus
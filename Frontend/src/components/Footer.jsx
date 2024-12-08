import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { CiLocationArrow1 } from "react-icons/ci";
import '../App.css';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#00008B", color: "white", padding: "20px 0",maxHeight:"100%",maxWidth:"100%"}}>
            <Container>
                <Row className="text-center text-lg-start">
                    <Col sm={12} lg={3} className="mb-4 p-3">
                        <h2 className="mb-3" style={{ color: "goldenrod", fontWeight: "bold" }}>EasyCare</h2>
                        <p style={{ fontSize: "14px" }}>
                            Dedicated to providing the best healthcare services to meet your needs.
                        </p>
                        <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col sm={12} lg={3} className="mb-4 p-3">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                            <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
                            <li><Link to="/appointment" className="text-light text-decoration-none">Appointment</Link></li>
                            <li><Link to="/service" className="text-light text-decoration-none">Service</Link></li>
                            <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
                        </ul>
                    </Col>

                    {/* Hours Section */}
                    <Col sm={12} lg={3} className="mb-4 p-3">
                        <h5 className="mb-3">Working Hours</h5>
                        <ul className="list-unstyled">
                            <li>Monday: <span className="text-light">9:00 AM - 11:00 PM</span></li>
                            <li>Tuesday: <span className="text-light">12:00 PM - 12:00 AM</span></li>
                            <li>Wednesday: <span className="text-light">10:00 AM - 9:00 PM</span></li>
                            <li>Thursday: <span className="text-light">2:00 PM - 9:00 PM</span></li>
                            <li>Saturday: <span className="text-light">9:00 AM - 3:00 PM</span></li>
                        </ul>
                    </Col>

                    {/* Contact Section */}
                    <Col sm={12} lg={3} className="mb-4 p-3">
                        <h5 className="mb-3">Contact Us</h5>
                        <p><FaPhoneAlt /> <span className="ms-2">+91-7549200441</span></p>
                        <p><CgMail /> <span className="ms-2">tauqueermanzer@gmail.com</span></p>
                        <p>
                            <CiLocationArrow1 /> 
                            <span className="ms-2">
                                <a href="https://g.co/kgs/CH4LeX6" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                                    Gachibowli, Hyderabad
                                </a>
                            </span>
                        </p>
                    </Col>
                </Row>
                <hr className="text-light" />
                <Row>
                    {/* Footer Bottom Section */}
                    <Col sm={12} md={6} className="text-center text-md-start">
                        <p>&copy; 2024 EasyCare. Made by Tauqueer Team.</p>
                    </Col>
                    <Col sm={12} md={6} className="text-center text-md-end">
                        <Link to="/privacy" className="text-light text-decoration-none me-3">Privacy Policy</Link>
                        <Link to="/terms" className="text-light text-decoration-none">Terms & Conditions</Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

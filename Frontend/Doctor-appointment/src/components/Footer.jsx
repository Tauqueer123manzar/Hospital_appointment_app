import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
// import logo from '../../src/assets/medical-logo (4).png'
import { CgMail } from "react-icons/cg";
import { CiLocationArrow1 } from "react-icons/ci";
import 'animate.css'
const Footer = () => {
    return (
        <>
            <Container fluid style={{ maxWidth: "100%", maxHeight: "100%" }}>
                <Row className='d-flex justify-content-center' style={{ maxWidth: "100%", maxHeight: "100%" }}>

                    <Col sm={12} lg={2} md={4}>
                        {/* <Image src={logo} style={{ maxWidth: "100%", maxHeight: "100%" }} className='fs-3' /> */}
                        <h1 style={{fontFamily:"initial",color:"blue",fontWeight:"bold"}}>EasyCare</h1>
                    </Col>

                    <Col sm={12} lg={3} md={4}>
                        <p className='fs-3' style={{ fontWeight: "700" }}>Quick Links</p>
                        <p><Link to="/" style={{ textDecoration: "none", color: "black", fontWeight: "500" }}>Home</Link></p>
                        <p><Link to="/about" style={{ textDecoration: "none", color: "black", fontWeight: "500" }}>About</Link></p>
                        <p><Link to="/appointment" style={{ textDecoration: "none", color: "black", fontWeight: "500" }}>Appointment</Link></p>
                    </Col>

                    <Col sm={12} lg={4} md={4}>
                        <p className='fs-3' style={{ fontWeight: "700", gap: "10px" }}>Hours</p>
                        <p style={{ fontFamily: "initial", fontWeight: "700" }} className='text-dark'>Monday<span className='p-4'>9:00AM-11:00PM</span></p>
                        <p style={{ fontFamily: "initial", fontWeight: "700" }} className='text-dark'>Tuesday<span className='p-4'>12:00PM-12:00AM</span></p>
                        <p style={{ fontFamily: "initial", fontWeight: "700" }} className='text-dark'>Wednesday<span className='p-2'>10:00AM-9:00PM</span></p>
                        <p style={{ fontFamily: "initial", fontWeight: "700" }} className='text-dark'>Thursday<span className='p-4'>2:00PM-9:00PM</span></p>
                        <p style={{ fontFamily: "initial", fontWeight: "700" }} className='text-dark'>Saturday<span className='p-4'>9:00AM-3:00PM</span></p>
                    </Col>

                    <Col sm={12} md={4} lg={3}>
                        <p className='fs-3' style={{ fontWeight: "700" }}>Contact Us</p>

                        <p><FaPhoneAlt className='text-danger fs-3' /><span className='p-2' style={{ fontWeight: "700" }}>+91-7549200441</span></p>

                        <p><CgMail className='text-primary fs-3' /><span className='p-2' style={{ fontWeight: "700" }}>tauqueermanzer@gmail.com</span></p>

                        <p>
                            <CiLocationArrow1 className='text-primary fs-3' />
                            <span className='p-2' style={{ fontWeight: "700" }}>
                                <a href='https://g.co/kgs/CH4LeX6' target='_blank' rel='noopener noreferrer' className='text-decoration-none text-dark'>
                                    Gachibowli, Hyderabad
                                </a>
                            </span>
                        </p>
                    </Col>
                    <div className='text-center m-4'>
                    <span style={{color:"red",fontSize:"700"}}>Copyright © 2024, Easy Care.</span>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Footer

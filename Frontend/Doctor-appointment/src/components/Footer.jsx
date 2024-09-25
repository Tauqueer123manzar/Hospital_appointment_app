import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import '../App.css';
import { CgMail } from "react-icons/cg";
import { CiLocationArrow1 } from "react-icons/ci";
import logo from '../assets/easy care (1).jpg'
import 'animate.css'
const Footer = () => {
    return (
        <>
            <Container fluid style={{ maxWidth: "100%", maxHeight: "100%",backgroundColor:"#00008B"}}>
                <Row className='d-flex justify-content-center' style={{ maxWidth: "100%", maxHeight: "100%" }}>

                    <Col sm={12} lg={2} md={4}>
                        {/* <Image src={logo} style={{ maxWidth: "100%", maxHeight: "100%" }} className='fs-3' /> */}
                        <h1 style={{color:"darkgoldenrod",fontWeight:"bold"}}><a href='/'/>EasyCare</h1>
                    </Col>

                    <Col sm={12} lg={3} md={4} className='p-3'>
                        <p className='fs-3' style={{color:"white",fontFamily:"initial",}}>Quick Links</p>
                        <p><Link to="/" style={{ textDecoration: "none", color: "white"}} className='home'>Home</Link></p>
                        <p><Link to="/about" style={{ textDecoration: "none", color: "white" }} className='about'>About</Link></p>
                        <p><Link to="/appointment" style={{ textDecoration: "none", color: "white"}} className='appointment'>Appointment</Link></p>
                        <p><Link to="/service" style={{ textDecoration: "none", color: "white" }} className='appointment'>Service</Link></p>
                        <p><Link to="/contact" style={{ textDecoration: "none", color: "white"}} className='appointment'>Contact</Link></p>
                    </Col>

                    <Col sm={12} lg={4} md={4} className='p-3'>
                        <p className='fs-3' style={{gap: "10px",color:"white",fontFamily:"initial",}}>Hours</p>
                        <p style={{ fontFamily: "initial"}} className='text-light'>Monday<span className='p-4'>9:00AM-11:00PM</span></p>
                        <p style={{ fontFamily: "initial"}} className='text-light'>Tuesday<span className='p-4'>12:00PM-12:00AM</span></p>
                        <p style={{ fontFamily: "initial" }} className='text-light'>Wednesday<span className='p-2'>10:00AM-9:00PM</span></p>
                        <p style={{ fontFamily: "initial"}} className='text-light'>Thursday<span className='p-4'>2:00PM-9:00PM</span></p>
                        <p style={{ fontFamily: "initial"}} className='text-light'>Saturday<span className='p-4'>9:00AM-3:00PM</span></p>
                    </Col>

                    <Col sm={12} md={4} lg={3} className='p-3'>
                        <p className='fs-3' style={{color:"white",fontFamily:"initial",}}>Contact Us</p>

                        <p><FaPhoneAlt className='text-light fs-3' /><span className='p-2' style={{color:"white"}}>+91-7549200441</span></p>

                        <p><CgMail className='text-light fs-3' /><span className='p-2' style={{color:"white" }}>tauqueermanzer@gmail.com</span></p>

                        <p>
                            <CiLocationArrow1 className='text-light fs-3' />
                            <span className='p-2'>
                                <a href='https://g.co/kgs/CH4LeX6' target='_blank' rel='noopener noreferrer' className='text-decoration-none text-light'>
                                    Gachibowli, Hyderabad
                                </a>
                            </span>
                        </p>
                    </Col>
                    <div className='text-center m-4'>
                    <hr style={{border:"1px solid white"}}/>
                    <span style={{color:"red",fontSize:"700"}}>Copyright © 2024, Easy Care.</span>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Footer

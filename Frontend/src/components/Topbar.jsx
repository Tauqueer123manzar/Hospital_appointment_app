import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Tauqueer from '../assets/Tauqueer Image.jpg'
import '../App.css'
const Topbar = () => {
  const[isLoggedIn,setIsLoggedIn]=useState(true);
  const[profile,setProfile]=useState({
    name:"Md Tauqueer Manzar",
    profilePicture:Tauqueer
  });

  const handlelogout=()=>{
    setIsLoggedIn(false);
  }

  const handlelogin=()=>{
    setIsLoggedIn(true);
  }
  return (
    <Navbar expand="lg" className="navbar shadow fixed-top bg-light">
    <Container fluid>
      <Navbar.Brand>
      <h1 style={{color:"darkred",fontWeight:"bold"}}><a href='/'/>EasyCare</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mx-auto"
          style={{ maxHeight: '100%',maxWidth:"100%",textAlign:"center"}}
          navbarScroll
        >
          <Nav.Link className='text-secondary home' style={{fontWeight:"bold"}} href="/">HOME</Nav.Link>
          <Nav.Link className='text-secondary alldoctor' style={{fontWeight:"bold"}} href='/alldoctors'>ALL DOCTORS</Nav.Link>
          <Nav.Link className='text-secondary appointment' style={{fontWeight:"bold"}} href="/appointment">APPOINTMENT</Nav.Link>
          <Nav.Link className='text-secondary about' style={{fontWeight:"bold"}} href="/about">ABOUT US</Nav.Link>
          <Nav.Link className='text-secondary service' style={{fontWeight:"bold"}} href='/service'>SERVICE</Nav.Link>
          <Nav.Link className='text-secondary contact' style={{fontWeight:"bold"}} href='/contact'>CONTACT</Nav.Link>
          <Nav.Link className='text-secondary myprofile' style={{fontWeight:"bold"}} href='/myprofile'></Nav.Link>
          <Nav.Link className='text-secondary myappointment' style={{fontWeight:"bold"}} href='/myappointment'></Nav.Link>
          </Nav>
          <div className='button'>
          <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" style={{ borderRadius: "50px",width: "150px", height: "45px", padding: 0,}}>
       <a href='/register' style={{color:"white",textDecoration:"none",listStyle:"none"}}> Create Account</a>
      </Dropdown.Toggle>

              <Dropdown.Menu align="end" className='bg-gray'>
                <Dropdown.Item href="/myappointment">My Appointments</Dropdown.Item>
                <Dropdown.Item href="/myprofile">My Profile</Dropdown.Item>
                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Topbar

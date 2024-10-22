import React, { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { context } from '../main';
import '../App.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const {isAuthenticated,setIsAuthenticated}=useContext(context);
  const navigateTo = useNavigate();

  // Logout function
 const handlelogout=async()=>{
    await axios.get("http://localhost:8080/api/v1/user/patient/logout",{
      withCredentials:true
    }).then((res)=>{
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    }).catch((err)=>{
      toast.error(err.response.data.message);
    })
  }


  const gotologin=()=>{
    navigateTo("/login");
  }


  return (
    <Navbar expand="lg" className="navbar shadow fixed-top bg-light">
      <Container fluid>
        <Navbar.Brand>
          <h1 style={{ color: 'darkred', fontWeight: 'bold' }}>
            <a href="/" style={{ textDecoration: 'none' }}>EasyCare</a>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto" style={{ maxHeight: '100%', maxWidth: '100%', textAlign: 'center' }} navbarScroll>
            <Nav.Link className='text-secondary home' style={{ fontWeight: 'bold' }} href="/">HOME</Nav.Link>
            <Nav.Link className='text-secondary alldoctor' style={{ fontWeight: 'bold' }} href='/alldoctors'>ALL DOCTORS</Nav.Link>
            <Nav.Link className='text-secondary appointment' style={{ fontWeight: 'bold' }} href="/appointment">APPOINTMENT</Nav.Link>
            <Nav.Link className='text-secondary about' style={{ fontWeight: 'bold' }} href="/about">ABOUT US</Nav.Link>
            <Nav.Link className='text-secondary service' style={{ fontWeight: 'bold' }} href='/service'>SERVICE</Nav.Link>
            <Nav.Link className='text-secondary contact' style={{ fontWeight: 'bold' }} href='/contact'>CONTACT</Nav.Link>
          </Nav>
          <div className='button'>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" style={{ borderRadius: '50px', width: '150px', height: '45px', padding: 0 }}>
                {/* Display login or logout based on the isAuthenticated state */}
                {isAuthenticated ? (
                  <span style={{ color: 'white', textDecoration: 'none' }}>Logout</span>
                ) : (
                  <span style={{ color: 'white', textDecoration: 'none' }}>Login</span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className="bg-gray">
                {/* These items are only visible if the user is authenticated */}
                {isAuthenticated ? (
                  <>
                    <Dropdown.Item href="/myappointment">My Appointments</Dropdown.Item>
                    <Dropdown.Item href="/myprofile">My Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handlelogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  // If the user is not authenticated, show only the login option
                  <Dropdown.Item onClick={gotologin}>Login</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;

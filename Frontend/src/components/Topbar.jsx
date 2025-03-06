import React, { useContext, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { context } from '../main';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button } from 'react-bootstrap';
// import axios from 'axios';

const Topbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  // Logout function
  const handlelogout = () => {
    try {
      toast.success("Logged out successfully");
      localStorage.clear();
      setIsAuthenticated(false);
    } catch (error) {
      console.log("error in logout:", error);
      toast.error(error);
    }
  }


  const gotologin = () => {
    navigateTo("/login");
  }

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated])


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
            <Button variant="primary" style={{ borderRadius: '50px', width: '100px', height: '45px',marginRight:'10px' }}>
              <Link to="/admin/login" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
            </Button>
          </div>
          <div className='button'>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" style={{ borderRadius: '50px', width: '100px', height: '45px', padding: 0 }}>
                {isAuthenticated ? (
                  <span style={{ color: 'white', textDecoration: 'none' }}>Logout</span>
                ) : (
                  <span style={{ color: 'white', textDecoration: 'none' }}>Login</span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className="bg-gray">
                {isAuthenticated ? (
                  <>
                    <Dropdown.Item href="/myappointment">My Appointments</Dropdown.Item>
                    <Dropdown.Item href="/myprofile">My Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handlelogout}>Logout</Dropdown.Item>
                  </>
                ) : (
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

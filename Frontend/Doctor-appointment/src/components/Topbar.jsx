import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Tauqueer from '../assets/Tauqueer Image.jpg'
import '../App.css'
const Topbar = () => {
  return (
    <Navbar expand="lg" className="navbar shadow">
    <Container fluid>
      <Navbar.Brand>
        <h2 style={{fontFamily:"initial",color:"blue",fontWeight:"bold",marginLeft:"10px"}}>EasyCare</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mx-auto"
          style={{ maxHeight: '100%',maxWidth:"100%",textAlign:"center"}}
          navbarScroll
        >
          <Nav.Link className='text-secondary home' style={{fontWeight:"bold"}} href="/">HOME</Nav.Link>
          <Nav.Link className='text-secondary appointment' style={{fontWeight:"bold"}} href="/appointment">APPOINTMENT</Nav.Link>
          <Nav.Link className='text-secondary about' style={{fontWeight:"bold"}} href="/about">ABOUT US</Nav.Link>
          <Nav.Link className='text-secondary service' style={{fontWeight:"bold"}} href='/service'>SERVICE</Nav.Link>
          <Nav.Link className='text-secondary contact' style={{fontWeight:"bold"}} href='/contact'>CONTACT</Nav.Link>
          <Nav.Link className='text-secondary myprofile' style={{fontWeight:"bold"}} href='/myprofile'></Nav.Link>
          <Nav.Link className='text-secondary myappointment' style={{fontWeight:"bold"}} href='/myappointment'></Nav.Link>
          </Nav>
          <div className='button'>
          <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor:"white",borderRadius:"50%",width:"75px",height:"60px",padding:0,display:"flex",justifyContent:"center",alignItems:"center",border:"none"}}>
                <Image src={Tauqueer} roundedCircle style={{ width: '100%', height: '100%', objectFit:"cover"}} />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className='bg-gray'>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
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

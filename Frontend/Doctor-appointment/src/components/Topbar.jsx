import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
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
          </Nav>
          <div className='button'>
          <Button variant="outline-success" style={{borderRadius:"10px",width:"100px",backgroundColor:"black",color:"white"}} href='/login'>Login</Button>
          </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Topbar

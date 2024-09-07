import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../assets/medical-logo (4).png'
import '../App.css'
const Topbar = () => {
  return (
    <Navbar expand="lg" className="navbar">
    <Container fluid>
      <Navbar.Brand>
        <img src={logo} alt='logo missing' style={{width:"200px",height:"65px"}}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mx-auto"
          style={{ maxHeight: '100%',maxWidth:"100%",textAlign:"center"}}
          navbarScroll
        >
          <Nav.Link className='text-secondary' style={{fontWeight:"bold"}} href="/">HOME</Nav.Link>
          <Nav.Link className='text-secondary' style={{fontWeight:"bold"}} href="/appointment">APPOINTMENT</Nav.Link>
          <Nav.Link className='text-secondary' style={{fontWeight:"bold"}} href="/about">ABOUT US</Nav.Link>
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

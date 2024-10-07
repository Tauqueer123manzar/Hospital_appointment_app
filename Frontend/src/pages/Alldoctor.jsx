import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Topbar from '../components/Topbar'
import '../App.css'
import Doctors from '../components/Doctors'
import Footer from '../components/Footer'
const Alldoctor = () => {
  return (
    <>
    <Topbar/>
        <Container fluid>
          <Doctors/>
        </Container>
        <Footer/>
    </>
  )
}

export default Alldoctor

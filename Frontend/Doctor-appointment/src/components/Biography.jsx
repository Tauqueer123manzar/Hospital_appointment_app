import React from 'react'
import { Row,Col,Container } from 'react-bootstrap';
import about from '../assets/about.png';
import '../App.css'
const Biography = ({ imageurl }) => {
  return (
   <Container fluid style={{backgroundColor:"#10E5D0"}}>
    <div className='biography' style={{maxWidth:"auto",maxHeight:"auto"}}>
      <Row>
        <Col lg={7} md={6} sm={12} className='animate__animated animate__fadeInLeft'>
           <img className="biography_image" src={imageurl} alt="missing image" style={{maxWidth:"100%",height:"auto"}}/>
        </Col>
        <Col lg={5} md={6} sm={12} className='animate__animated animate__fadeInRight'>
          <p className='mt-5 fs-3' style={{fontWeight:"700",fontFamily:"initial"}}>BIOGRPAHY</p>
          <h3>Who we are</h3>
          <p>Zeecare Medical Institute, founded in 1985, has been a cornerstone of medical excellence and compassionate care in our community for nearly four decades. Nestled in the heart of downtown, our state-of-the-art facility is renowned for its commitment to delivering top-tier healthcare services to patients from all walks of life.</p>
          <p>Since our inception, Zeecare Medical Institue has grown from a small community hospital to a leading healthcare institution. Our journey has been marked by significant milestones, including the establishment of our advanced cardiac care center, the opening of our state-of-the-art cancer treatment facility, and the launch of numerous community health initiatives.</p>
          <p>This biography highlights the hospital's mission, values, services, history, and community involvement, painting a comprehensive picture of what makes Zeecare Medical Institue a trusted healthcare institution.</p>
        </Col>
      </Row>
    </div>
   </Container>
  )
}

export default Biography

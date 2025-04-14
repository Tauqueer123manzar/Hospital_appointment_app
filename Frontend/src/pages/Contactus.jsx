import React from 'react'
import { Container, Row,Col} from 'react-bootstrap'
import Topbar from '../components/Topbar';
import hospital from '../assets/Rectangle 1548.jpg';
import MessageForm from '../components/MessageForm';
import Footer from '../components/Footer';
import { IoLocationSharp } from "react-icons/io5";
import { GrEmergency } from "react-icons/gr";
import { IoTime } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
const Contactus = () => {
    return (
        <>
        <Topbar />
        <div className='box' style={{
                    backgroundImage: `url(${hospital})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    width:"100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    left:"0"
                }}>
                </div>
            <Container fluid>
              <Row style={{background: '#f8f9fa'}}>
                <h2 className='text-center mt-4' style={{fontWeight:"bold",fontFamily:"initial"}}>Get In Touch</h2>
                <h2 className='text-center mt-2' style={{fontSize:"65px",fontWeight:"bold",fontFamily:"initial"}}>Contact Us</h2>
                <p className='text-center mt-2' style={{fontSize:"22px",fontFamily:"initial"}}>Have questions or need more information? Reach out to us! </p>
                <Col className="mt-5" sm={12} md={5} lg={5}>
                   <div style={{width:"100%",height:"90%",border:"1px dashed orangered",borderRadius:"20px",backgroundColor:"lightskyblue"}}className='mt-4 p-2'>
                     <div className='p-2 m-2'>
                      <h2><IoLocationSharp /> Our Locations</h2>
                      <p style={{marginLeft:"40px"}}>Banjara Hills</p>
                      <p style={{marginLeft:"40px"}}>Gachibowli</p>
                     </div>
                     <div className='p-2 m-2'>
                      <h2><IoCall /> Call Us</h2>
                      <p style={{marginLeft:"40px"}}>1800 123 456</p>
                     </div>
                     <div className='p-2 m-2'>
                      <h2><GrEmergency /> 24*7 Emergency</h2>
                      <p style={{marginLeft:"40px"}}>Banjara Hills +91-7549200441</p>
                      <p style={{marginLeft:"40px"}}>Gachibowli    +91-8765432687</p>
                     </div>
                     <div className='p-2 m-2'>
                      <h2><IoTime /> OPD Timings</h2>
                      <p style={{marginLeft:"40px"}}>Monday - Saturday</p>
                      <p style={{marginLeft:"40px"}}>9:00 AM - 5:00 PM</p>
                     </div>
                   </div>
                </Col>
                <Col className="mt-4" sm={12} md={6} lg={7}>
                   <MessageForm className="mt-4"/>
                </Col>
                <Footer/>
              </Row>
            </Container>
        </>
    )
}

export default Contactus

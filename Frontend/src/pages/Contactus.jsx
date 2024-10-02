import React from 'react'
import { Container, Row} from 'react-bootstrap'
import Topbar from '../components/Topbar';
import hospital from '../assets/Rectangle 1548.jpg';
import MessageForm from '../components/MessageForm';
import Footer from '../components/Footer';
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
              <Row style={{backgroundColor:"lightgray"}}>
                <h1 className='text-center mt-4' style={{fontWeight:"bold",fontFamily:"initial"}}>Get In Touch</h1>
                <h1 className='text-center mt-2' style={{fontSize:"65px",fontWeight:"bold",fontFamily:"initial"}}>Contact Us</h1>
                <p className='text-center mt-2' style={{fontSize:"22px",fontFamily:"initial"}}>Have questions or need more information? Reach out to us! </p>
                <MessageForm className="mt-4"/>
                <Footer/>
              </Row>
            </Container>
        </>
    )
}

export default Contactus

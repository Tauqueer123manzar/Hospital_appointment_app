import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Toast} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../App.css';
const MessageForm = () => {
  const[firstname,setFirstName]=useState("");
  const[lastname,setLastname]=useState("");
  const[email,setEmail]=useState("");
  const[phonenumber,setPhonenumber]=useState("");
  const[message,setMessage]=useState("");
 
  const handleMessage=async(e)=>{
   e.preventDefault();
   try{
     await axios.post("http://localhost:8080/api/v1/message/send",
      {firstname,lastname,email,phonenumber,message},
      {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      }
     ).then(res=>{
     toast.success(res.data.message);
     setFirstName("");
     setLastname("");
     setEmail("");
     setPhonenumber("");
     setMessage("");
     });
   }catch(error){
     toast.error(error.response.data.message);
   }
  }
  return (
    <Container fluid className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
      <div className="shadow-lg p-2 bg-white rounded message-form" style={{ maxWidth: '700px', width: '100%',height:"90%",marginBottom:"60px"}}>
        <h2 className='text-center fw-1' style={{ fontSize: "30px", fontWeight: "bold",color:"rgba(0, 126, 133, 1)"}}>Request a call back</h2>
        <Form onSubmit={handleMessage}>
          <Row className="m-1">
            <Col lg={12} md={4} sm={12} className='p-3'>
              <Form.Group as={Col} controlId="formfname">
                <Form.Control type="text"
                  value={firstname}
                  onChange={(e)=> setFirstName(e.target.value)}
                  placeholder="First name"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>

            <Col lg={12} md={4} sm={12} className='p-3'>
              <Form.Group as={Col} controlId="formlname">
                <Form.Control type="text"
                  value={lastname}
                  onChange={(e)=> setLastname(e.target.value)}
                  placeholder="Last name"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-1">
            <Col lg={12} md={4} sm={12} className='p-3'>
              <Form.Group as={Col} controlId="formemail">
                <Form.Control type='text'
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  placeholder="Email"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>

            <Col lg={12} md={4} sm={12} className='p-3'>
              <Form.Group as={Col} controlId="formnumber">
                <Form.Control type='number'
                  value={phonenumber}
                  onChange={(e)=> setPhonenumber(e.target.value)}
                  placeholder="Phone Number"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='m-1'>
            <Col lg={12} md={12} sm={12}>
              <Form.Group controlId="textarea">
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={message}
                  onChange={(e)=> setMessage(e.target.value)}
                  placeholder='Write a message'
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='d-flex justify-content-center p-3 m-1'>
            <Col xs='auto'>
              <Button variant='primary' type='submit' style={{ width: "150px" }}>
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>

  )
}

export default MessageForm


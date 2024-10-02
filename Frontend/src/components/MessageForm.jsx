import React, { useState } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import '../App.css'
const MessageForm = () => {
  //usestate function
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handlechange = () => {
    e.preventDefault();
  };

  return (
    <Container fluid className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
      <div className="shadow-lg p-5 bg-white rounded mt-5 message-form" style={{ maxWidth: '800px', width: '100%',height:"90%",marginBottom:"45px"}}>
        <h2 className='text-center fw-1' style={{ fontSize: "30px", fontWeight: "bold",color:"rgba(0, 126, 133, 1)"}}>Send Us A Message</h2>
        <Form onSubmit={handlechange}>
          <Row className="m-5">
            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group as={Col} controlId="formfname">
                <Form.Control type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>

            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group as={Col} controlId="formlname">
                <Form.Control type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-5">
            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group as={Col} controlId="formemail">
                <Form.Control type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>

            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group as={Col} controlId="formnumber">
                <Form.Control type='number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='m-5'>
            <Col lg={12} md={12} sm={12}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={8}
                  type='text'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Message'
                  style={{padding:'10px'}} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='d-flex justify-content-center p-2'>
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


import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Topbar from '../components/Topbar'

const Appointment = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handlechange = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      firstName,
      lastName,
      email,
      phone,
      message
    });
  };

  return (
    <Container fluid>
     <Topbar/>
      <div className='message'>
        <h2 className='text-center text-black fw-1' style={{ fontSize: "30px", fontWeight: "bold" }}>Send Us A Message</h2>
        <Form onSubmit={handlechange}>

          <Row className="m-5">
            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group controlId="formfname">
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group controlId="formlname">
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="m-5">
            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group controlId="formemail">
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={4} sm={12} className='p-2'>
              <Form.Group controlId="formnumber">
                <Form.Control
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='m-5'>
            <Col lg={12} md={12} sm={12}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Message'
                />
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
  );
};

export default Appointment;

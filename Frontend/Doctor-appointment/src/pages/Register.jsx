import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css'
import Topbar from '../components/Topbar';
import signup from '../assets/healthbg.jpg'
import Footer from '../components/Footer';
const Register = () => {
  return (
    <Container fluid>
      <div className='box' style={{
        backgroundImage: `url(${signup})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <Topbar />
        <h2 className='text-center mt-4' sm={12} md={6} lg={4} style={{ fontFamily: "initial", fontWeight: "bold" }}>SignUp</h2>
        <p  className='text-center mt-2 text-secondary' style={{ fontSize: "20px", fontFamily: "initial" }}>Please Sign Up To Continue</p>
        <p  className='text-center text-secondary' style={{ fontFamily: "initial" }}>If you are not registered ,then please registered after register you can Signin</p>
        <Form>
          <Row className='display-flex justify-content-center'>
            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='firstname'>
                <Form.Control
                  required
                  type='text'
                  placeholder='Firstname'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='lastname'>
                <Form.Control
                  required
                  type='text'
                  placeholder='Lastname'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='email'>
                <Form.Control
                  required
                  type='email'
                  placeholder='Email'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='mobile'>
                <Form.Control
                  required
                  type='Number'
                  placeholder='Mobile Number'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='pincode'>
                <Form.Control
                  required
                  type='Number'
                  placeholder='Pincode'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='dob'>
                <Form.Control
                  required
                  type='date'
                  placeholder='Date of Birth'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='gender'>
                <Form.Select
                  required
                  style={{ padding: "12px", maxWidth: "auto" }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3 p-2" controlId='password'>
                <Form.Control
                  required
                  type='password'
                  placeholder='Password'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <p className='text-center'>Already registered? <a href='/login' className='text-decoration-none'>Login Now</a></p>
          <Row className='display-flex justify-content-center p-4'>
            <Col xs={12} lg={3} md={6} className='p-2'>
              <Button variant='primary' className='w-100'>
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <hr style={{border:"1px solid black"}}/>
      <div style={{marginTop:"55px"}}>
      <Footer/>
      </div>
    </Container>
  )
}

export default Register

import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
const Login = () => {
  return (
    <Container fluid>
      <div className='box' style={{
        backgroundColor: "lightblue"
      }}>
        <Topbar />
        <h2 className='text-center mt-4' sm={12} md={6} lg={4} style={{ fontFamily: "initial", fontWeight: "bold" }}>SignIn</h2>
        <p className='text-center mt-2 text-dark' style={{ fontSize: "20px", fontFamily: "initial" }}>Please Signin To Continue</p>
        <p className='text-center text-dark' style={{ fontFamily: "initial" }}>If you are registered ,then please Login</p>
        <Form>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col md={6} lg={4}>
              <Form.Group className="mb-3 p-2" controlId='email'>
                <Form.Control
                  required
                  type='email'
                  placeholder='Email'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='d-flex justify-content-center align-items-center'>
            <Col md={6} lg={4}>
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

          <Row className='d-flex justify-content-center align-items-center'>
            <Col md={6} lg={4}>
              <Form.Group className="mb-3 p-2" controlId='confirmpassword'>
                <Form.Control
                  required
                  type='password'
                  placeholder='Confirm password'
                  style={{ padding: "12px", maxWidth: "auto" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <p className='text-center'>Not registered? <a href='/register' className='text-decoration-none'>Register Now</a></p>
          <Row className='d-flex justify-content-center p-4'>
            <Col xs={8} lg={2} md={6} className='p-2'>
              <Button variant='primary' className='w-100'>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <hr style={{ border: "1px solid black" }} />
      <div>
        <Footer />
      </div>
    </Container>
  )
}

export default Login

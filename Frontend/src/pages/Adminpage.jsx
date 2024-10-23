import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
const Adminpage = () => {
  return (
   <>
    <Topbar />
      <Container fluid className='d-flex flex-column' style={{ maxHeight: '100vh', padding: 0 }}>
        <div
          className='d-flex flex-column justify-content-center align-items-center'
          style={{
            backgroundColor:'lightcyan',
            width: '100%',
            maxHeight: '100vh',
            padding: '20px',
          }}
        >
          <h2 className='text-center' style={{ fontWeight: "bold", fontFamily: "initial", marginTop: "120px" }}>Admin and Doctor Login</h2>
          <Form style={{ width: '100%', maxWidth: '600px' }} className='mt-3'>
            <div className='shadow-lg p-5 bg-white rounded mt-3' style={{ maxWidth: "800px", height: "100%" }}>
              <Row className='d-flex justify-content-center align-items-center'>
                <h2 className='text-center'>Login</h2>
                <Col xs={12}>
                  <Form.Group className='mb-3 p-2' controlId='email'>
                    <Form.Control
                      required
                      type='email'
                      placeholder='Email'
                      name='email'
                    //   value={email}
                      style={{ padding: '12px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='d-flex justify-content-center'>
                <Col xs={12}>
                  <Form.Group className='mb-3 p-2' controlId='password'>
                    <Form.Control
                      required
                      type='password'
                      name='password'
                    //   value={password}
                      placeholder='Password'
                      style={{ padding: '12px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='d-flex justify-content-center'>
                <Col xs={12}>
                  <Form.Group className='mb-3 p-2' controlId='confirmPassword'>
                    <Form.Control
                      required
                      type='password'
                      name='confirmPassword'
                    //   value={confirmPassword}
                      placeholder='Confirm Password'
                      style={{ padding: '12px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='d-flex justify-content-center p-4'>
                <Col xs={8} lg={4} md={6} className='p-2'>
                  <Button variant='primary' type="submit" className='w-100'>
                    Login
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
        <Footer />
      </Container>
   </>
  )
}

export default Adminpage

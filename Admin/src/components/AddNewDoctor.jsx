import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const AddNewDoctor = () => {
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Container fluid className='text-center' style={{ height: "98vh", width: "94%", padding: 0, margin: 0, marginLeft: "120px"}}>
        <h1 style={{ color: 'darkred', fontWeight: 'bold', fontSize: "45px" }} className='text-center'>EasyCare</h1>
        <div className='profile'>
          <h1 className='text-center mt-3' style={{ fontFamily: "initial", fontSize: "35px" }}>Add New Doctor</h1>

          <Row className='mt-4 mb-4'>
            <Col xs={12} md={6} lg={5}>
              <div
                style={{
                  width: "60%",
                  height: "500px",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "15px",
                  marginLeft: "220px",
                  borderRadius:"10px"
                }}>
                {
                  avatar ? (
                    <img src={avatar}
                      alt='Avatar'
                      style={{ width: "100%", height: "100%", objectFit: "cover"}} />

                  ) : (
                    <span>No Image</span>
                  )
                }
              </div>
              <Form.Group>
                <Form.Control
                  type='file'
                  onChange={handleFileChange}
                  style={{ marginLeft: "220px", width: "60%"}}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={7}>
              <Form>
                <Form.Group controlId='firstname' className='mb-4'>
                  <Form.Control
                    type='text'
                    placeholder='First Name'
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='lastname' className='mb-4'>
                  <Form.Control
                    type='text'
                    placeholder='Last Name'
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='email' className='mb-4'>
                  <Form.Control
                    type='text'
                    placeholder='Email'
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='phone' className='mb-4'>
                  <Form.Control
                    type='Number'
                    placeholder='Mobile Number'
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId='gender'>
                  <Form.Select
                    required
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId='password' className='mb-4'>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='department'>
                  <Form.Control
                    type='text'
                    placeholder='Department'
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>
                <div className='mt-4 d-flex justify-content-center' style={{width:"70%"}}>
                <Button type='submit' variant='primary' className='w-100'>
                 Register New Doctor
                </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default AddNewDoctor

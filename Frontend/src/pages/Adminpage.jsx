import React, { useContext,useEffect } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { context } from '../main';
import { toast } from 'react-toastify';
const Adminpage = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin"
  });

   const {isAuthenticated,setIsAuthenticated}=useContext(context);
   const navigate=useNavigate();

   if(isAuthenticated){
    navigate("/");
   }

   const handleChange=(e)=>{
     setFormdata({
      ...formdata,
      [e.target.name]:e.target.value
     });
   };

   const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("Form submitted",formdata);
    if (formdata.password !== formdata.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
     const response= await axios.post("http://localhost:8080/api/v1/user/login",formdata,{
        headers:{
          "Content-Type":"application/json"
        }
      });
      toast.success(response.data.message);
      console.log(response.data);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      console.error("Login failed error!", error);
    }
   }

   useEffect(() => {
    if (isAuthenticated) {
        navigate('/'); 
        console.log("isAuthenticates",isAuthenticated);
    }
}, [isAuthenticated]);
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
          <Form style={{ width: '100%', maxWidth: '600px' }} className='mt-3' onSubmit={handleSubmit}>
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
                      value={formdata.email}
                      onChange={handleChange}
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
                      value={formdata.password}
                      placeholder='Password'
                      onChange={handleChange}
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
                      value={formdata.confirmPassword}
                      placeholder='Confirm Password'
                      onChange={handleChange}
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

import React, { useState,useContext} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import signup from '../assets/healthbg.jpg'
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { context } from '../main';
import axios from 'axios'
import '../App.css'
const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();
  const{isAuthenticated,setIsAuthenticated}=useContext(context);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Form submitted', firstname, lastname, email, phone, gender, password);
    try {
      await axios.post("http://localhost:8080/api/v1/user/patient/register",
        { firstname, lastname, email, phone, gender, password,role:"Patient" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(res => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setFirstName("");
        setLastname("");
        setEmail("");
        setPhone("");
        setGender("");
        setPassword("");
      })
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthenticated){
   navigate("/");
  }

  return (
    <>
      <Topbar />
      <Container fluid className='d-flex flex-column' style={{ maxHeight: "100vh", padding: 0 }}>
        <div className='' style={{
          backgroundImage: `url(${signup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}>
          <h2 className='text-center' style={{ fontWeight: "bold", fontFamily: "initial",marginTop:"120px" }}>User Signup</h2>
          <Form style={{ maxWidth: '99%' }} className='d-flex justify-content-center align-items-center p-4 mt-2' onSubmit={handleRegister}>
            <div className='shadow-lg p-5 bg-white rounded mt-3' style={{ maxWidth: "800px", height: "100%" }}>
              <Row className='d-flex justify-content-center align-items-center'>
                <h2 className='text-center mt-4' sm={12} md={6} lg={4} style={{ fontFamily: "initial", fontWeight: "bold" }}>SignUp</h2>
                <Col xs={12} md={6} lg={5}>
                  <Form.Group className="mb-3 p-2" controlId='firstname'>
                    <Form.Control
                      required
                      type='text'
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='Mobile Number'
                      style={{ padding: "12px", maxWidth: "auto" }}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={5}>
                  <Form.Group className="mb-3 p-2" controlId='gender'>
                    <Form.Select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password'
                      style={{ padding: "12px", maxWidth: "auto" }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <p className='text-center'>Already registered? <a href='/login' className='text-decoration-none'>Login Now</a></p>
              <Row className='display-flex justify-content-center p-4'>
                <Col xs={12} lg={3} md={6} className='p-2'>
                  <Button type='submit' variant='primary' className='w-100'>
                    Register
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

export default Register

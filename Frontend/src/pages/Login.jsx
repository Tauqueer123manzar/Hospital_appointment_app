import  { useContext, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {context} from '../main';
const Login = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient"
  });

  const {isAuthenticated,setIsAuthenticated}=useContext(context);
  const navigate = useNavigate();

  if(isAuthenticated){
    return navigate("/");
  }
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password matching validation
    if (formdata.password !== formdata.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/login", formdata, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(response.status===200){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user._id);
        localStorage.setItem("role",response.data.role);
      }
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      console.error("Login failed error!", error);
    }
  };

  return (
    <>
      <Topbar />
      <Container fluid className='d-flex flex-column' style={{ maxHeight: '100vh', padding: 0 }}>
        <div
          className='d-flex flex-column justify-content-center align-items-center'
          style={{
            backgroundColor: 'lightblue',
            width: '100%',
            maxHeight: '100vh',
            padding: '20px',
          }}
        >
          <h2 className='text-center' style={{ fontWeight: "bold", fontFamily: "initial", marginTop: "120px" }}>Patient Login</h2>
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
                      onChange={handleChange}
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
                      value={formdata.confirmPassword}
                      onChange={handleChange}
                      placeholder='Confirm Password'
                      style={{ padding: '12px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <p className='text-center'>
                Not registered?{' '}
                <a href='/register' className='text-decoration-none'>
                  Register Now
                </a>
              </p>

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
  );
};

export default Login;

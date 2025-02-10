import React, { useState,useContext} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {context} from "../../main"
import axios from 'axios'
import Sidebar from '../../components/Sidebar';
const AddnewAdmin = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();
  const{isAuthenticated,setIsAuthenticated}=useContext(context);

  const handleAddNewAdmin= async (e) => {
    e.preventDefault();
    console.log('Form submitted', firstname, lastname, email, phone, gender, password);
    try {
      await axios.post("http://localhost:8080/api/v1/user/admin/addnew",
        { firstname, lastname, email, phone, gender, password},
        {
          withCredentials: true,
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("adminToken")}`
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


  return (
    <>
    <Sidebar/>
      <Container fluid className='d-flex flex-column' style={{ height: "98vh",width:"94%", padding: 0 ,margin:0,marginLeft:"100px",backgroundColor:"#f0f0f1"}}>
      <h1 style={{ color: 'darkred', fontWeight: 'bold',fontSize:"50px"}} className='text-center mt-4'>EasyCare</h1>
          <h2 className='text-center mt-4' style={{ fontWeight: "bold", fontFamily: "initial"}}>Add New Admin</h2>
          <Form style={{ maxWidth: '100%',height:"80%"}} className='d-flex justify-content-center align-items-center p-4 mt-2' onSubmit={handleAddNewAdmin}>
            <div className='' style={{width:"60%", height: "100%" }}>
              <Row className='d-flex justify-content-center align-items-center'>
                <h2 className='text-center mt-4' sm={12} md={6} lg={4} style={{ fontFamily: "initial", fontWeight: "bold" }}></h2>
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
              <Row className='display-flex justify-content-center p-4'>
                <Col xs={12} lg={3} md={6} className='p-2'>
                  <Button type='submit' variant='primary' className='w-100'>
                    Add New Admin
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
      </Container>
    </>
  )
}

export default AddnewAdmin

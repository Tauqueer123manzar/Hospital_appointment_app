import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, Button,Spinner} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
const AddNewDoctor = () => {

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctordepartment, setDoctordepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [Loading,setLoading]=useState(false);

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Cardiology",
    "ENT",
    "Orthopedics",
    "Neurology",
    "Dermatology",
    "Radiology",
    "Physical Therapy",
    "Oncology",
    "Pediatrics"
  ];

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("doctordepartment", doctordepartment);
      formData.append("docAvatar", docAvatar);
  
      await axios.post("http://localhost:8080/api/v1/user/doctor/addnew", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        navigateTo("/");
        setFirstName("");
        setLastname("");
        setEmail("");
        setPhone("");
        setGender("");
        setPassword("");
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }finally{
      setLoading(false);
    }
  };
  

  if (!isAuthenticated) {
    return navigateTo("/login");
  }
  return (
    <>
      <Container fluid className='text-center' style={{ height: "98vh", width: "100%", padding: 0, margin: 0, marginLeft: "120px" }}>
        <h1 style={{ color: 'darkred', fontWeight: 'bold', fontSize: "45px" }} className='text-center'>EasyCare</h1>
        <div className='profile'>
          <h1 className='text-center mt-3' style={{ fontFamily: "initial", fontSize: "35px", fontWeight: "bold" }}>Add New Doctor</h1>

          <Row className='mt-4 mb-4'>
              <Col xs={12} md={6} lg={5}>
                <div
                  style={{
                    width: "60%",
                    height: "450px",
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "15px",
                    marginLeft: "220px",
                    borderRadius: "10px",
                    boxShadow:"0px 0px 1px 1px rgba(0,0,0,0.1)"
                  }}>
                  {
                    <img style={{width:"100%",height:"100%",objectFit:"cover"}}
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8PKmdYN-fRm-cPdF5UNnXzbZuD6SAG6cZg&s"
                }
                alt="Doctor Avatar"
              />
            }
                </div>
                <Form.Group>
                  <Form.Control
                    type='file'
                    onChange={handleAvatar}
                    style={{ marginLeft: "220px", width: "60%"}}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={7}>
              {
                Loading ?(
                  <div className='text-center'>
                    <Spinner animation="border" variant="primary"/>
                    <p>Loading....</p>
                  </div>
                ):(
              <Form onSubmit={handleAddNewDoctor}>
                <Form.Group controlId='firstname' className='mb-4'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='First Name'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='lastname' className='mb-4'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Last Name'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='email' className='mb-4'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='phone' className='mb-4'>
                  <Form.Control
                    type='Number'
                    placeholder='Mobile Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId='gender'>
                  <Form.Select
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                    required
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "70%", padding: "10px", margin: "5px" }}
                  />
                </Form.Group>

                <Form.Group controlId='department'>
                  <Form.Select
                    required
                    value={doctordepartment}
                    onChange={(e) => setDoctordepartment(e.target.value)}
                    style={{ width: "70%", padding: "10px", margin: "5px" }}>
                    <option value="">Select Department</option>
                    {departmentsArray.map((depart, index) => {
                      return (
                        <option value={depart} key={index}>
                          {depart}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <div className='mt-4 d-flex justify-content-center' style={{ width: "70%" }}>
                  <Button type='submit' variant='primary' className='w-100'>
                    Register New Doctor
                  </Button>
                </div>
                </Form>
                )}
              </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default AddNewDoctor

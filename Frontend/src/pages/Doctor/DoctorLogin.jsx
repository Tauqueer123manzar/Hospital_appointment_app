import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { context } from "../../main";
import { toast } from "react-toastify";

const DoctorLogin = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    role: "Doctor"
  });

  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/doctor/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formdata);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(response.data.message);
      console.log(response.data);
      
      // Store Doctor Token
      localStorage.setItem("doctorToken", response.data.token);
      
      console.log("Doctor Logged In Successfully");
      setIsAuthenticated(true);
      navigate("/doctor/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error("Login failed error!", error);
    }
  };

  return (
    <Container fluid style={{ height: "100vh", width: "100vw", padding: 0 }}>
      <div className="bg-light p-5 h-100">
        <h2 className="text-center" style={{ fontWeight: "bold", fontFamily: "initial", marginTop: "45px" }}>
          Doctor Login
        </h2>
        <Form style={{ width: "100%" }} className="mt-3 d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
          <div className="shadow-lg p-5 bg-white rounded mt-3" style={{ maxWidth: "900px", height: "100%" }}>
            <Row className="d-flex justify-content-center align-items-center">
              <h2 className="text-center">Login</h2>
              <Col xs={12}>
                <Form.Group className="mb-3 p-2" controlId="email">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    style={{ padding: "12px" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="d-flex justify-content-center">
              <Col xs={12}>
                <Form.Group className="mb-3 p-2" controlId="password">
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={formdata.password}
                    placeholder="Password"
                    onChange={handleChange}
                    style={{ padding: "12px" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="d-flex justify-content-center p-4">
              <Col xs={8} lg={4} md={6} className="p-2">
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default DoctorLogin;

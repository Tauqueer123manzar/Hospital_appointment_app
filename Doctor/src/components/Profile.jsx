import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctordepartment, setDoctordepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  // Handle avatar upload and preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setDocAvatar(file);
    setDocAvatarPreview(URL.createObjectURL(file));
  };

  // Submit handler (for example purposes only)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or API request here
    console.log({
      firstname,
      lastname,
      email,
      phone,
      gender,
      password,
      doctordepartment,
      docAvatar,
    });
  };

  return (
    <Container className="my-5" style={{marginLeft:"300px",height:"100%",width:"100%"}}>
      <h2 className="text-center mb-4">Edit Doctor Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstname" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastname" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="doctordepartment" className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            value={doctordepartment}
            onChange={(e) => setDoctordepartment(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="docAvatar" className="mb-4">
          <Form.Label>Doctor Avatar</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {docAvatarPreview && (
            <div className="mt-3">
              <p>Avatar Preview:</p>
              <img
                src={docAvatarPreview}
                alt="Doctor Avatar Preview"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </div>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;

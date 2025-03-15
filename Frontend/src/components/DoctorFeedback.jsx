import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const DoctorFeedback = () => {
  const [show, setShow] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState(""); // Stores selected doctor ID
  const [doctors, setDoctors] = useState([]); // Stores list of doctors
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/doctors");
        console.log("Doctors API Response:", response.data); // Debugging log

        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else if (response.data?.doctors) {
          setDoctors(response.data.doctors);
        } else {
          console.error("Unexpected API response format", response.data);
          setDoctors([]); // Default empty array if data format is wrong
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]); // Set empty list on error
      }
    };

    fetchDoctors();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDoctor = doctors.find((doc) => doc._id === doctor); // Find doctor by ID
    if (!selectedDoctor) {
      alert("Please select a valid doctor");
      return;
    }

    const feedbackData = {
      patientName,
      doctorId: doctor,
      doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`, // Send doctor name
      rating,
      feedback
    };

    try {
      await axios.post("http://localhost:8080/api/v1/feedback/submit", feedbackData);
      alert("Feedback submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    }
  };

  return (
    <>
      <Container className="text-center">
        <Button variant="primary" onClick={handleShow}>
          Give Feedback
        </Button>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Doctor Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/* Patient Name */}
              <Form.Group className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Doctor Selection */}
              <Form.Group className="mb-3">
                <Form.Label>Select Doctor</Form.Label>
                <Form.Select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.length > 0 ? (
                    doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.firstName} {doc.lastName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No doctors available</option>
                  )}
                </Form.Select>
              </Form.Group>

              {/* Show Selected Doctor Name */}
              {doctor && (
                <p>
                  <strong>Selected Doctor:</strong>{" "}
                  {doctors.find((doc) => doc._id === doctor)?.firstName}{" "}
                  {doctors.find((doc) => doc._id === doctor)?.lastName}
                </p>
              )}

              {/* Rating */}
              <Form.Group className="mb-3">
                <Form.Label>Rate the Doctor</Form.Label>
                <div>
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        style={{ cursor: "pointer", marginRight: 5 }}
                        color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setRating(currentRating)}
                      />
                    );
                  })}
                </div>
              </Form.Group>

              {/* Feedback Textarea */}
              <Form.Group className="mb-3">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Submit Feedback
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default DoctorFeedback;

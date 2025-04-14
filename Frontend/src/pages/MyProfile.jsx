import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Badge, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, FiMail, FiPhone, FiCalendar,
  FiAward, FiUpload, FiFileText
} from 'react-icons/fi';
import { FaTransgenderAlt } from 'react-icons/fa';
import Topbar from '../components/Topbar';
import '../App.css';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [prescriptionUrl, setPrescriptionUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // 🔁 Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUser(data.user);
        setPrescriptionUrl(data.user.prescription || '');
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching profile");
        if (error.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ⬆️ Upload prescription
  const handlePrescriptionUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("prescription", file);
  
    try {
      setUploading(true);
      const res = await axios.post("http://localhost:8080/api/uploadprescription", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      setPrescriptionUrl(res.data.url); // Update this depending on your API's response
      toast.success("Prescription uploaded successfully!");
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Failed to upload prescription");
    } finally {
      setUploading(false);
    }
  };
   
  // 📅 Format joined date
  const formatDate = (date) => {
    if (!date) return 'Not Available';
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <>
      <Topbar />
      <div className="profile-hero">
        <Container>
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.firstname?.[0]?.toUpperCase()}
              {user?.lastname?.[0]?.toUpperCase()}
            </div>
          </div>
        </Container>
      </div>

      <Container className="profile-container">
        <div className="profile-header text-center mb-5">
          <h1 className="profile-name">{user?.firstname} {user?.lastname}</h1>
          <Badge pill bg="primary" className="role-badge">
            {user?.role || 'Member'}
          </Badge>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : user ? (
          <Card className="profile-card">
            <Card.Body>
              <Row>
                <Col md={6} className="mb-4">
                  <h4><FiUser className="me-2" /> Personal Information</h4>
                  <p><strong>Full Name:</strong> {user.firstname} {user.lastname}</p>
                  <p><strong><FaTransgenderAlt className="me-1" /> Gender:</strong> {user.gender || 'Not specified'}</p>
                </Col>
                <Col md={6} className="mb-4">
                  <h4><FiMail className="me-2" /> Contact Information</h4>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong><FiPhone className="me-1" /> Phone:</strong> {user.phone || 'Not provided'}</p>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h4><FiAward className="me-2" /> Account Info</h4>
                  <p><strong>Role:</strong> <Badge bg="secondary">{user.role}</Badge></p>
                  <p><strong><FiCalendar className="me-1" /> Joined:</strong> {formatDate(user.createdAt)}</p>
                </Col>
                <Col md={6}>
                  <h4><FiFileText className="me-2" /> Prescription</h4>
                  {prescriptionUrl ? (
                    <a href={prescriptionUrl} target="_blank" rel="noreferrer">
                      View Uploaded Prescription
                    </a>
                  ) : (
                    <p>No prescription uploaded</p>
                  )}
                  <Form.Group className="mt-3">
                    <Form.Label><FiUpload className="me-2" /> Upload New Prescription</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files[0])}
                      disabled={uploading}
                    />
                    {uploading && <div className="mt-2 text-primary">Uploading...</div>}
                  </Form.Group>
                  <Button onClick={handlePrescriptionUpload} disabled={uploading} className="mt-2">
                    {uploading ? "Uploading..." : "Upload Prescription"}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <Card className="text-center py-5">
            <Card.Body>
              <h4>No profile data available</h4>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default MyProfile;

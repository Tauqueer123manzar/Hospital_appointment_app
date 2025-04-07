import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiCalendar, FiAward } from 'react-icons/fi';
import { FaTransgenderAlt } from 'react-icons/fa';
import Topbar from '../components/Topbar';
import '../App.css';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8080/api/v1/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching profile");
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    // Try to parse the input date
    let date;
    
    if (dateString) {
      date = new Date(dateString);
      // If valid date, return formatted string
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
    
    // If no valid date, generate a default (account creation date)
    const defaultDate = new Date(); // Current date as default
    return defaultDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' (default)';
  };
  return (
    <>
      <Topbar />
      
      <div className="profile-hero">
        <Container>
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.firstname?.charAt(0).toUpperCase()}
              {user?.lastname?.charAt(0).toUpperCase()}
            </div>
          </div>
        </Container>
      </div>

      <Container className="profile-container">
        <div className="profile-header text-center mb-5">
          <h1 className="profile-name">
            {user?.firstname} {user?.lastname}
          </h1>
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
                  <div className="info-section">
                    <h4 className="section-title">
                      <FiUser className="me-2" />
                      Personal Information
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">
                        {user.firstname} {user.lastname}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">
                        <FaTransgenderAlt className="me-1" />
                        Gender
                      </span>
                      <span className="info-value">
                        {user.gender || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="info-section">
                    <h4 className="section-title">
                      <FiMail className="me-2" />
                      Contact Information
                    </h4>
                    <div className="info-item">
                      <span className="info-label">Email Address</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">
                        <FiPhone className="me-1" />
                        Phone Number
                      </span>
                      <span className="info-value">
                        {user.phone || 'Not provided'}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <div className="info-section">
                    <h4 className="section-title">
                      <FiAward className="me-2" />
                      Account Information
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Account Type</span>
                        <span className="info-value">
                          <Badge bg="secondary">{user.role}</Badge>
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">
                          <FiCalendar className="me-1" />
                          Member Since
                        </span>
                        <span className="info-value">
                          {formatDate(user?.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
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
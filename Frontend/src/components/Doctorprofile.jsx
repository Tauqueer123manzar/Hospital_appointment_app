import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button, ListGroup, Badge } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import DoctorFeedback from './DoctorFeedback';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const reviews = [
        {
            patientName: "Bhavika Dadia Sanghavi",
            profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180",
            rating: 5,
            comment: "Dr.Manisha Kumari and Dr. Sneha Kumari were really patient and awesome throughout my pregnancy consultation. They listen to you carefully and provide all the required guidance and support. Best gynecologists to go to."
        },
        {
            patientName: "Krupali Patel",
            profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180",
            rating: 5,
            comment: "Best gynecologist.. office staff is also very friendly and so helpful. Doctor is very popular so you will notice some waiting but to get good care I don't mind waiting."
        },
        {
            patientName: "Kalpa Gada",
            profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180",
            rating: 5,
            comment: "I would have given 10 stars to Dr. Kirit Patel's practice. Both Dr. Kirit Patel and Dr. Meghal Patel have been awesome throughout our pregnancy."
        }
    ];

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/user/doctors/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
                    }
                });
                setDoctor(response.data.doctor);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching doctor data");
                setLoading(false);
            }
        };
        fetchDoctorDetails();
    }, [id]);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                backgroundColor: '#f8f9fa'
            }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="mt-5 text-center">
                <Card className="shadow p-5" style={{ backgroundColor: '#fff5f5' }}>
                    <h2 className="text-danger">Error</h2>
                    <p>{error}</p>
                    <Link to="/alldoctors" className="btn btn-outline-primary mt-3">
                        <ArrowLeft /> Back to Doctors
                    </Link>
                </Card>
            </Container>
        );
    }

    return (
        <Container fluid style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>
            <Container>
                {/* Header with back button */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Link to="/alldoctors" className="btn btn-outline-primary me-3" style={{ borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </Link>
                    <h1 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>Doctor Profile</h1>
                </div>

                {/* Main Doctor Card */}
                <Card className="shadow-lg mb-5" style={{ borderRadius: '15px', border: 'none' }}>
                    <Card.Body>
                        <Row className="align-items-center">
                            {/* Doctor Image */}
                            <Col md={4} className="text-center mb-4 mb-md-0">
                                <div style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    margin: '0 auto',
                                    border: '5px solid #e9f2ff'
                                }}>
                                    <img 
                                        src={doctor.docAvatar ? doctor.docAvatar.url : 'https://via.placeholder.com/200'} 
                                        alt="Doctor" 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover' 
                                        }} 
                                    />
                                </div>
                                <h3 className="mt-3" style={{ color: '#0d6efd' }}>Dr. {doctor.firstname} {doctor.lastname}</h3>
                                <Badge bg="info" style={{ fontSize: '1rem', padding: '5px 15px' }}>
                                    {doctor.doctordepartment}
                                </Badge>
                            </Col>

                            {/* Doctor Details */}
                            <Col md={8}>
                                <div style={{ 
                                    backgroundColor: '#e9f2ff', 
                                    padding: '20px', 
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <h4 style={{ color: '#0d6efd', borderBottom: '2px solid #0d6efd', paddingBottom: '10px' }}>About Doctor</h4>
                                    <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                        {doctor.about || 'Experienced and dedicated medical professional committed to providing the highest quality care to patients.'}
                                    </p>

                                    <Row>
                                        <Col md={6}>
                                            <div style={{ marginBottom: '15px' }}>
                                                <strong style={{ color: '#6c757d' }}>Email:</strong>
                                                <p style={{ margin: '5px 0 0 0' }}>{doctor.email}</p>
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <strong style={{ color: '#6c757d' }}>Phone:</strong>
                                                <p style={{ margin: '5px 0 0 0' }}>{doctor.phone}</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div style={{ marginBottom: '15px' }}>
                                                <strong style={{ color: '#6c757d' }}>Gender:</strong>
                                                <p style={{ margin: '5px 0 0 0' }}>{doctor.gender}</p>
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <strong style={{ color: '#6c757d' }}>Experience:</strong>
                                                <p style={{ margin: '5px 0 0 0' }}>10+ Years</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="d-flex mt-4" style={{ gap: '15px' }}>
                                        <Button 
                                            variant="primary" 
                                            size="lg" 
                                            href="/appointment"
                                            style={{ 
                                                backgroundColor: '#0d6efd',
                                                border: 'none',
                                                padding: '10px 25px',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            Book Appointment
                                        </Button>
                                        <DoctorFeedback />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Patient Reviews Section */}
                <h2 className="text-center mb-4" style={{ color: '#0d6efd', position: 'relative' }}>
                    <span style={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '0 20px', 
                        position: 'relative', 
                        zIndex: 1 
                    }}>
                        Patient Testimonials
                    </span>
                    <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: 0, 
                        right: 0, 
                        height: '2px', 
                        backgroundColor: '#dee2e6', 
                        zIndex: 0 
                    }}></div>
                </h2>

                <Row className="g-4">
                    {reviews.map((review, index) => (
                        <Col key={index} lg={4} md={6}>
                            <Card style={{ 
                                border: 'none', 
                                borderRadius: '15px', 
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                                height: '100%'
                            }}>
                                <Card.Body style={{ padding: '25px' }}>
                                    <div className="d-flex align-items-center mb-4">
                                        <img 
                                            src={review.profileImg} 
                                            alt={review.patientName} 
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                marginRight: '15px'
                                            }}
                                        />
                                        <div>
                                            <h5 style={{ margin: 0 }}>{review.patientName}</h5>
                                            <div style={{ color: '#ffc107', fontSize: '1.2rem' }}>
                                                {Array(review.rating).fill().map((_, i) => (
                                                    <span key={i}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Card.Text style={{ 
                                        color: '#495057', 
                                        fontStyle: 'italic',
                                        position: 'relative'
                                    }}>
                                        <span style={{ 
                                            fontSize: '3rem', 
                                            lineHeight: '1', 
                                            color: '#e9ecef', 
                                            position: 'absolute', 
                                            top: '-20px', 
                                            left: '-10px'
                                        }}>"</span>
                                        {review.comment}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default DoctorProfile;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Card, Alert } from 'react-bootstrap';
import Topbar from './Topbar';
import axios from 'axios';

const DoctorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get(`http://localhost:8080/api/v1/user/doctors/${id}`);
                setDoctor(response.data.doctor);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching doctor data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDoctorData();
        } else {
            setError('No ID provided in the URL');
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
    }

    if (!doctor) {
        return <Alert variant="warning" className="mt-5 text-center">Doctor Not Found</Alert>;
    }

    return (
        <>
            <Topbar />
            <div className="doctorpage py-4" style={{ backgroundColor: "lightgrey", minHeight: "100vh" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={doctor.docAvatar || '/placeholder-image.png'}
                                    alt={doctor.firstname || 'Doctor'}
                                    height={350}
                                />
                                <Card.Body>
                                    <Card.Title className="text-center">
                                        {doctor.firstname} {doctor.lastname}
                                    </Card.Title>
                                    <Card.Text className="text-muted text-center">
                                        {doctor.specialization || "Specialization not provided"}
                                    </Card.Text>
                                    <hr />
                                    <Card.Text>
                                        <strong>Department:</strong> {doctor.doctordepartment || 'N/A'}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Email:</strong> {doctor.email || 'N/A'}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Phone:</strong> {doctor.phone || 'N/A'}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button
                                        onClick={() => navigate(`/appointment?doctorId=${id}`)}
                                        variant="primary"
                                    >
                                        Book Appointment
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default DoctorProfile;

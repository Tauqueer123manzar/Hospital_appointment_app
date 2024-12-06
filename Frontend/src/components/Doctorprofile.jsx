import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import Topbar from './Topbar';
import axios from 'axios';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('id from useParams:', id);
        const fetchDoctorData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/v1/user/doctors/${id}`);
                setDoctor(response.data.doctor);
            } catch (error) {
                console.error('Error fetching doctor data:', error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDoctorData();
        } else {
            console.error('No id provided in URL');
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <Spinner animation="border" variant="danger" className="mt-5 d-flex justify-content-center" style={{ marginLeft: "45%" }} />;
    }

    if (!doctor) {
        return <p>Doctor Not Found</p>;
    }

    return (
        <>
            <Topbar />
            <div className="doctorpage" style={{ backgroundColor: "lightgrey" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} lg={5}>
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={doctor.docAvatar}
                                    alt={doctor.firstname}
                                    height={350}
                                />
                                <Card.Body>
                                    <Card.Title>
                                        {doctor.firstname} {doctor.lastname}
                                    </Card.Title>
                                    <Card.Text>
                                        {doctor.specialization || "No specialization provided"}
                                    </Card.Text>
                                    <Card.Text>
                                        Department: {doctor.doctordepartment}
                                    </Card.Text>
                                    <Card.Text>
                                        Email: {doctor.email}
                                    </Card.Text>
                                    <Card.Text>
                                        Phone: {doctor.phone}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Button
                                        href="/appointment"
                                        variant="primary"
                                        className="d-flex justify-content-center align-items-center"
                                    >
                                        Book Appointment
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default DoctorProfile;

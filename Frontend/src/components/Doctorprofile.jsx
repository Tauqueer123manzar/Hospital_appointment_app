import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button,Spinner} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Topbar from './Topbar';
import axios from 'axios';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loader,setLoader]=useState(false);
    const apiUrl = `http://localhost:8080/api/v1/user/doctors/${id}`;

    useEffect(() => {
        const fetchDoctorData = async () => {
            setLoader(true);
            try {
                const response = await axios.get(apiUrl);
                setDoctor(response.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }finally{
                setLoader(false);
            }
        };

        fetchDoctorData();
    }, [id]);

    if (!doctor) {
        return <Spinner animation='border' variant='danger' className='mt-5 d-flex justify-content-center' style={{marginLeft:"45%"}}/>
    }

    return (
        <>
            <Topbar />
            <div className='doctorpage' style={{ backgroundColor: "lightgrey" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} lg={5} style={{ marginTop: "70px" }}>
                            <Card className='mb-5 mt-4'>
                                <Card.Img variant="top" src={doctor.docAvatar} alt={doctor.Name} height={350} />
                                <Card.Body>
                                    <Card.Title>{doctor.Name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {doctor.Department}
                                    </Card.Subtitle>
                                    <Card.Text style={{ fontWeight: "650" }}>
                                        {doctor.specialization || "Specialization information not available."}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><strong>Experience:</strong> {doctor.experience || "N/A"}</ListGroup.Item>
                                    <ListGroup.Item><strong>Age:</strong> {doctor.age || "N/A"}</ListGroup.Item>
                                    <ListGroup.Item><strong>Mobile No:</strong> {doctor.Phone}</ListGroup.Item>
                                    <ListGroup.Item><strong>Email:</strong> {doctor.Email}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Button href="/appointment" variant="primary" className='d-flex justify-content-center align-items-center'>
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

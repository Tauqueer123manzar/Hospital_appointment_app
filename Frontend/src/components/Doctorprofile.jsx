import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import doctor1 from '../assets/file (2) 1.jpg';
import doctor2 from '../assets/file (2) 2.jpg';
import doctor3 from '../assets/file (2) 3.png';
import doctor4 from '../assets/file (3) 1.jpg';
import doctor5 from '../assets/file (3) 3.png';
import doctor6 from '../assets/file (4) 1.jpg';
import doctor7 from '../assets/file (4) 2.jpg';
import doctor8 from '../assets/file (4) 4.png';
import doctor9 from '../assets/file (5) 1.jpg';
import doctor10 from '../assets/file (5) 2.png';
import doctor11 from '../assets/file (5) 3.png';
import doctor12 from '../assets/file (5) 4.png';
import appointment from '../pages/Appointment.jsx';
import Topbar from './Topbar';
const DoctorProfile = () => {
    const { id } = useParams();
    const doctorId = parseInt(id);
    const Doctorsdata = [
        {
            id: 1,
            image: doctor1,
            title: "Available",
            name: "Dr. Richard James",
            description: "Cardiology",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 2,
            image: doctor2,
            title: "Available",
            name: "Dr. Richard James",
            description: "ENT",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 3,
            image: doctor3,
            title: "Available",
            name: "Dr. Richard James",
            description: "Neurology",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 4,
            image: doctor4,
            title: "Available",
            name: "Dr. Richard James",
            description: "Orthopedics",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 5,
            image: doctor5,
            title: "Available",
            name: "Dr. Richard James",
            description: "Therapy",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 6,
            image: doctor6,
            title: "Available",
            name: "Dr. Richard James",
            description: "Dermatology",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 7,
            image: doctor7,
            title: "Available",
            name: "Dr. Richard James",
            description: "Pediatrics",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 8,
            image: doctor8,
            title: "Available",
            name: "Dr. Richard James",
            description: "General physician",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 9,
            image: doctor9,
            title: "Available",
            name: "Dr. Richard James",
            description: "Oncology",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 10,
            image: doctor10,
            title: "Available",
            name: "Dr. Richard James",
            description: "ENT",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 11,
            image: doctor11,
            title: "Available",
            name: "Dr. Richard James",
            description: "Neurology",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
        {
            id: 12,
            image: doctor12,
            title: "Available",
            name: "Dr. Richard James",
            description: "Therapy",
            specialization: "Dr. Richard James is specialist in cardiology this is best doctor",
            experience: "5 years",
            Age: "45",
            mobileno: "9474658273",
            email: "richard@gmail.com"
        },
    ];
    // Fetch the doctor information based on the id or use dummy data
    const doctor = Doctorsdata.find((doc) => doc.id === doctorId) || Doctorsdata[0];
    // You can fetch the data from API or context state depending on your data flow

    return (
        <>
            <Topbar />
            <div className='doctorpage' style={{backgroundColor:"lightgrey"}}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className='mb-5 mt-4'>
                            <Card.Img variant="top" src={doctor.image} alt={doctor.name} height={370}/>
                            <Card.Body>
                                <Card.Title>{doctor.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {doctor.specialization}
                                </Card.Subtitle>
                                <Card.Text style={{fontWeight:"650"}}>{doctor.description}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><strong>Experience:</strong> {doctor.experience}</ListGroup.Item>
                                <ListGroup.Item><strong>Age:</strong> {doctor.Age}</ListGroup.Item>
                                <ListGroup.Item><strong>Mobile No:</strong> {doctor.mobileno}</ListGroup.Item>
                                <ListGroup.Item><strong>Email:</strong> {doctor.email}</ListGroup.Item>
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

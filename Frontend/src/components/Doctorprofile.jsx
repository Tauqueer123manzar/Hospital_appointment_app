import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import DoctorFeedback from './DoctorFeedback';

const DoctorProfile = () => {
    const { id } = useParams();  // Get doctor ID from URL
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const reviews = [
        {
            patientName: "Bhavika Dadia Sanghavi",
            profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180", // Replace with actual image
            rating: 5,
            comment: "Dr.Manisha Kumari and Dr. Sneha Kumari were really patient and awesome throughout my pregnancy consultation. They listen to you carefully and provide all the required guidance and support. Best gynecologists to go to."
        },
        {
            patientName: "Krupali Patel",
            profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180",
            rating: 5,
            comment: "Best gynecologist.. office staff is also very friendly and so helpful. Doctor is very popular so you will notice some waiting but to get good care I don’t mind waiting. If you also think same than this doctor office is perfect choice for you."
        },
        {
            patientName: "Kalpa Gada",
            profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180",
            rating: 5,
            comment: "I would have given 10 stars to Dr. Kirit Patel’s practice. Both Dr. Kirit Patel and Dr. Meghal Patel have been awesome throughout our pregnancy. With their experience, they helped us deliver our second baby without any issues."
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
        return <h1 className='text-center mt-4 text-danger'>Loading...</h1>;
    }

    if (error) {
        return <h1 className='text-center mt-4 text-danger'>{error}</h1>;
    }

    return (
        <Container className='doctor-profile-container mt-2' style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
            <h1 className='text-center text-blue p-2 m-3' style={{ fontStyle: "initial" }}>Doctor Profile</h1>
            <h3 className='text-center text-danger p-2'>{doctor.firstname} {doctor.lastname} - {doctor.doctordepartment}</h3>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={8} className='profile-card-container'>
                    <Card className='shadow-lg doctor-card p-4'>
                        <Row className='align-items-center'>
                            <Col md={4} className='text-center'>
                                <Card.Img
                                    src={doctor.docAvatar ? doctor.docAvatar.url : 'fallback-image-url'}
                                    alt='Doctor Avatar'
                                    className='doctor-img rounded-circle'
                                />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title className='text-dark'>{doctor.firstname} {doctor.lastname}</Card.Title>
                                    <Card.Text><strong>Email:</strong> {doctor.email}</Card.Text>
                                    <Card.Text><strong>Phone:</strong> {doctor.phone}</Card.Text>
                                    <Card.Text><strong>Gender:</strong> {doctor.gender}</Card.Text>
                                    <Card.Text><strong>Department:</strong> {doctor.doctordepartment}</Card.Text>
                                    <Card.Text><strong>About:</strong> {doctor.about || 'Doctor is very good and has a lot of experience.'}</Card.Text>
                                    <Button variant="success" className="mt-3 me-3" href="/appointment">
                                        Book an Appointment
                                    </Button>
                                    <Link to="/alldoctors" className="btn btn-primary mt-3">
                                        Go Back
                                    </Link>

                                </Card.Body>
                            </Col>
                            <div className='text-center'>
                                <Button variant='primary' className='w-75'><DoctorFeedback/></Button>
                            </div>
                        </Row>
                    </Card>
                </Col>
            </Row>
            {/* Patient reviews  */}
            <Row className='justify-content-center mt-5 mb-5'>
                <Col xs={12}>
                    <h4 className='text-center text-primary mb-4'>Patient Reviews</h4>
                    <Row className="justify-content-center">
                        {reviews.map((review, index) => (
                            <Col key={index} xs={12} md={4} className="mb-4">
                                <Card className='shadow-sm p-3 text-center'>
                                    <Card.Img
                                        variant="top"
                                        src={review.profileImg}
                                        alt={review.patientName}
                                        className='rounded-circle mx-auto mt-3'
                                        style={{ width: '60px', height: '60px' }}
                                    />
                                    <Card.Body>
                                        <Card.Title className='text-success'>{review.patientName}</Card.Title>
                                        <div className="text-warning">
                                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                        </div>
                                        <Card.Text className='mt-2'>{review.comment}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

        </Container>
    );
};

export default DoctorProfile;

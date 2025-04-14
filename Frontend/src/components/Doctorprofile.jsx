// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Card, Row, Col, Button, ListGroup } from 'react-bootstrap';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../App.css';
// import DoctorFeedback from './DoctorFeedback';

// const DoctorProfile = () => {
//     const { id } = useParams();  // Get doctor ID from URL
//     const [doctor, setDoctor] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     const reviews = [
//         {
//             patientName: "Bhavika Dadia Sanghavi",
//             profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180", // Replace with actual image
//             rating: 5,
//             comment: "Dr.Manisha Kumari and Dr. Sneha Kumari were really patient and awesome throughout my pregnancy consultation. They listen to you carefully and provide all the required guidance and support. Best gynecologists to go to."
//         },
//         {
//             patientName: "Krupali Patel",
//             profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180",
//             rating: 5,
//             comment: "Best gynecologist.. office staff is also very friendly and so helpful. Doctor is very popular so you will notice some waiting but to get good care I don’t mind waiting. If you also think same than this doctor office is perfect choice for you."
//         },
//         {
//             patientName: "Kalpa Gada",
//             profileImg: "https://tse4.mm.bing.net/th?id=OIP.Blj2M36K5WYTyNd6v6Jz0QHaJf&pid=Api&P=0&h=180",
//             rating: 5,
//             comment: "I would have given 10 stars to Dr. Kirit Patel’s practice. Both Dr. Kirit Patel and Dr. Meghal Patel have been awesome throughout our pregnancy. With their experience, they helped us deliver our second baby without any issues."
//         }
//     ];

//     useEffect(() => {
//         const fetchDoctorDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/v1/user/doctors/${id}`, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("adminToken")}`
//                     }
//                 });
//                 setDoctor(response.data.doctor);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.response?.data?.message || "Error fetching doctor data");
//                 setLoading(false);
//             }
//         };
//         fetchDoctorDetails();
//     }, [id]);

//     if (loading) {
//         return <h1 className='text-center mt-4 text-danger'>Loading...</h1>;
//     }

//     if (error) {
//         return <h1 className='text-center mt-4 text-danger'>{error}</h1>;
//     }

//     return (
//         <Container className='doctor-profile-container mt-2' style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
//             <h1 className='text-center text-blue p-2 m-3' style={{ fontStyle: "initial" }}>Doctor Profile</h1>
//             <h3 className='text-center text-danger p-2'>{doctor.firstname} {doctor.lastname} - {doctor.doctordepartment}</h3>
//             <Row className="justify-content-center">
//                 <Col xs={12} md={8} lg={8} className='profile-card-container'>
//                     <Card className='shadow-lg doctor-card p-4'>
//                         <Row className='align-items-center'>
//                             <Col md={4} className='text-center'>
//                                 <Card.Img
//                                     src={doctor.docAvatar ? doctor.docAvatar.url : 'fallback-image-url'}
//                                     alt='Doctor Avatar'
//                                     className='doctor-img rounded-circle'
//                                 />
//                             </Col>
//                             <Col md={8}>
//                                 <Card.Body>
//                                     <Card.Title className='text-dark'>{doctor.firstname} {doctor.lastname}</Card.Title>
//                                     <Card.Text><strong>Email:</strong> {doctor.email}</Card.Text>
//                                     <Card.Text><strong>Phone:</strong> {doctor.phone}</Card.Text>
//                                     <Card.Text><strong>Gender:</strong> {doctor.gender}</Card.Text>
//                                     <Card.Text><strong>Department:</strong> {doctor.doctordepartment}</Card.Text>
//                                     <Card.Text><strong>About:</strong> {doctor.about || 'Doctor is very good and has a lot of experience.'}</Card.Text>
//                                     <Button variant="success" className="mt-3 me-3" href="/appointment">
//                                         Book an Appointment
//                                     </Button>
//                                     <Link to="/alldoctors" className="btn btn-primary mt-3">
//                                         Go Back
//                                     </Link>

//                                 </Card.Body>
//                             </Col>
//                             <div className='text-center'>
//                                 <Button variant='primary' className='w-75'><DoctorFeedback/></Button>
//                             </div>
//                         </Row>
//                     </Card>
//                 </Col>
//             </Row>
//             {/* Patient reviews  */}
//             <Row className='justify-content-center mt-5 mb-5'>
//                 <Col xs={12}>
//                     <h4 className='text-center text-primary mb-4'>Patient Reviews</h4>
//                     <Row className="justify-content-center">
//                         {reviews.map((review, index) => (
//                             <Col key={index} xs={12} md={4} className="mb-4">
//                                 <Card className='shadow-sm p-3 text-center'>
//                                     <Card.Img
//                                         variant="top"
//                                         src={review.profileImg}
//                                         alt={review.patientName}
//                                         className='rounded-circle mx-auto mt-3'
//                                         style={{ width: '60px', height: '60px' }}
//                                     />
//                                     <Card.Body>
//                                         <Card.Title className='text-success'>{review.patientName}</Card.Title>
//                                         <div className="text-warning">
//                                             {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
//                                         </div>
//                                         <Card.Text className='mt-2'>{review.comment}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Col>
//             </Row>

//         </Container>
//     );
// };

// export default DoctorProfile;


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

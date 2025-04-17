import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  ListGroup, 
  Image,
  Dropdown,
  Navbar
} from 'react-bootstrap';
import { 
  FaUserMd, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaHospital,
  FaMapMarkerAlt,
  FaEdit,
  FaIdCard,
  FaStethoscope,
  FaStar,
  FaUserCircle
} from 'react-icons/fa';
import '../../App.css';
import Sidebar from '../../components/DoctorSidebar'

const DoctorProfile = () => {
  const [currentDoctor, setCurrentDoctor] = useState('mukesh');

  // Static doctor data
  const doctors = {
    mukesh: {
      id: 'doc1',
      firstName: 'Mukesh',
      lastName: 'Sharma',
      email: 'mukesh@gmail.com',
      phone: '+91 9876543210',
      dob: '1985-05-15',
      gender: 'Male',
      address: '123 Medical Plaza, New Delhi, India',
      avatar: 'https://i.pravatar.cc/150?img=32',
      specialization: 'Cardiologist',
      qualifications: ['MD', 'DM Cardiology', 'MBBS'],
      experience: 12,
      fee: 1500,
      hospital: 'Apollo Hospital',
      bio: 'Dr. Mukesh Sharma is a renowned cardiologist with over 12 years of experience in treating complex heart conditions. He has performed over 5000 successful angioplasties and is a pioneer in minimally invasive cardiac surgeries.',
      rating: 4.8,
      availableDays: ['Mon', 'Wed', 'Fri'],
      timings: '9:00 AM - 5:00 PM'
    },
    anjali: {
      id: 'doc2',
      firstName: 'Anjali',
      lastName: 'Patel',
      email: 'anjali@gmail.com',
      phone: '+91 8765432109',
      dob: '1988-08-22',
      gender: 'Female',
      address: '456 Health Street, Mumbai, India',
      avatar: 'https://i.pravatar.cc/150?img=44',
      specialization: 'Pediatrician',
      qualifications: ['MD Pediatrics', 'MBBS', 'DCH'],
      experience: 8,
      fee: 1200,
      hospital: 'Fortis Hospital',
      bio: 'Dr. Anjali Patel specializes in pediatric care with a gentle approach that puts children at ease. She has extensive experience in neonatal care and childhood immunizations, and is beloved by her young patients.',
      rating: 4.9,
      availableDays: ['Tue', 'Thu', 'Sat'],
      timings: '10:00 AM - 6:00 PM'
    },
    ravi: {
      id: 'doc3',
      firstName: 'Ravi',
      lastName: 'Kumar',
      email: 'ravi@gmail.com',
      phone: '+91 7654321098',
      dob: '1980-11-30',
      gender: 'Male',
      address: '789 Care Avenue, Bangalore, India',
      avatar: 'https://i.pravatar.cc/150?img=65',
      specialization: 'Neurologist',
      qualifications: ['DM Neurology', 'MD', 'MBBS'],
      experience: 15,
      fee: 2000,
      hospital: 'Manipal Hospital',
      bio: 'Dr. Ravi Kumar is a leading neurologist specializing in stroke management and epilepsy treatment. His research on neurodegenerative diseases has been published in several international journals.',
      rating: 4.7,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timings: '8:00 AM - 4:00 PM'
    }
  };

  const doctor = doctors[currentDoctor];

  return (
    <>
    <Sidebar/>
    <Container fluid className="p-0 doctor-profile-container">
      {/* Header */}
      <Navbar bg="primary" variant="dark" className="profile-header">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <FaUserCircle size={28} className="me-2" />
            <span>Doctor Profile</span>
          </Navbar.Brand>
          <div className="d-flex">
            <Dropdown className="me-3">
              <Dropdown.Toggle variant="light" id="dropdown-doctors">
                Switch Doctor
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(doctors).map((key) => (
                  <Dropdown.Item 
                    key={key} 
                    onClick={() => setCurrentDoctor(key)}
                    active={currentDoctor === key}
                  >
                    Dr. {doctors[key].firstName} {doctors[key].lastName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="light">
              <FaEdit className="me-2" />
              Edit Profile
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="py-4">
        {/* Doctor Summary Card */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3} className="text-center mb-3 mb-md-0">
                <Image 
                  src={doctor.avatar} 
                  roundedCircle 
                  fluid 
                  className="doctor-avatar"
                  alt={`Dr. ${doctor.firstName}`}
                />
              </Col>
              <Col md={9}>
                <h2 className="mb-1">Dr. {doctor.firstName} {doctor.lastName}</h2>
                <h5 className="text-primary mb-3">{doctor.specialization}</h5>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <Badge bg="warning" className="d-flex align-items-center">
                    <FaStar className="me-1" /> {doctor.rating.toFixed(1)}
                  </Badge>
                  <Badge bg="info" className="d-flex align-items-center">
                    <FaBriefcaseMedical className="me-1" /> {doctor.experience} yrs exp
                  </Badge>
                  <Badge bg="success" className="d-flex align-items-center">
                    ₹{doctor.fee} fee
                  </Badge>
                  <Badge bg="secondary" className="d-flex align-items-center">
                    <FaHospital className="me-1" /> {doctor.hospital}
                  </Badge>
                </div>
                <p className="text-muted mb-0">
                  Available: {doctor.availableDays.join(', ')} ({doctor.timings})
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row>
          {/* Personal Information */}
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0 d-flex align-items-center">
                  <FaUserMd className="me-2" /> Personal Information
                </h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-primary text-white me-3">
                      <FaIdCard />
                    </div>
                    <div>
                      <small className="text-muted">Full Name</small>
                      <p className="mb-0">Dr. {doctor.firstName} {doctor.lastName}</p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-primary text-white me-3">
                      <FaEnvelope />
                    </div>
                    <div>
                      <small className="text-muted">Email</small>
                      <p className="mb-0">{doctor.email}</p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-primary text-white me-3">
                      <FaPhone />
                    </div>
                    <div>
                      <small className="text-muted">Phone</small>
                      <p className="mb-0">{doctor.phone}</p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-primary text-white me-3">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <small className="text-muted">Date of Birth</small>
                      <p className="mb-0">
                        {new Date(doctor.dob).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-primary text-white me-3">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <small className="text-muted">Address</small>
                      <p className="mb-0">{doctor.address}</p>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {/* Professional Information */}
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0 d-flex align-items-center">
                  <FaStethoscope className="me-2" /> Professional Information
                </h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-info text-white me-3">
                      <FaBriefcaseMedical />
                    </div>
                    <div>
                      <small className="text-muted">Specialization</small>
                      <p className="mb-0">{doctor.specialization}</p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-info text-white me-3">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <small className="text-muted">Qualifications</small>
                      <p className="mb-0">{doctor.qualifications.join(', ')}</p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-info text-white me-3">
                      <FaHospital />
                    </div>
                    <div>
                      <small className="text-muted">Hospital/Clinic</small>
                      <p className="mb-0">{doctor.hospital}</p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-info text-white me-3">
                      <FaBriefcaseMedical />
                    </div>
                    <div>
                      <small className="text-muted">Experience</small>
                      <p className="mb-0">{doctor.experience} years</p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-info text-white me-3">
                      <FaBriefcaseMedical />
                    </div>
                    <div>
                      <small className="text-muted">Consultation Fee</small>
                      <p className="mb-0">₹{doctor.fee}</p>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        {/* Biography */}
        <Card className="shadow-sm">
          <Card.Header className="bg-secondary text-white">
            <h5 className="mb-0">About Me</h5>
          </Card.Header>
          <Card.Body>
            <p className="mb-0">{doctor.bio}</p>
          </Card.Body>
        </Card>
      </Container>
    </Container>
    </>
  );
};

export default DoctorProfile;
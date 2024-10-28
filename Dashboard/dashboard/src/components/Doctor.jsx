import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import doctor1 from '../assets/file (5) 4.png';
import doctor2 from '../assets/file (5) 3.png';
import doctor3 from '../assets/file (4) 4.png';
const Doctor = () => {
  return (
    <>
     <Container fluid style={{maxWidth:"100vh",maxWidth:"100vw"}}>
     <Row className='mt-4 d-flex justify-content-center'>
     <h1 className='text-center text-primary'>Doctors</h1>
     <Col sm={12} md={4}>
     <Card style={{ width: '20rem',marginLeft:"300px"}}>
      <Card.Img variant="top" src={doctor1} height={300}/>
      <Card.Body>
        <Card.Title className='p-2'>Dr.Ramesh</Card.Title>
        <Card.Subtitle  className='p-2'><strong>Email:</strong>ramesh@gmail.com</Card.Subtitle>
        <Card.Subtitle  className='p-2'><strong>Phone:</strong>+91-987654321</Card.Subtitle>
        <Card.Subtitle  className='p-2'><strong>Speciality:</strong>Orthopedics</Card.Subtitle>
        <Card.Text>     
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    <Col sm={12} md={4}>
     <Card style={{ width: '20rem',marginLeft:"100px"}}>
      <Card.Img variant="top" src={doctor2} height={300}/>
      <Card.Body>
        <Card.Title className='p-2'>Dr.Ramesh</Card.Title>
        <Card.Subtitle  className='p-2'><strong>Email:</strong>ramesh@gmail.com</Card.Subtitle>
        <Card.Subtitle  className='p-2'><strong>Phone:</strong>+91-987654321</Card.Subtitle>
        <Card.Subtitle  className='p-2'><strong>Speciality:</strong>Orthopedics</Card.Subtitle>
        <Card.Text>     
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    <Col sm={12} md={4}>
     <Card style={{ width: '20rem',marginLeft:"-100px"}}>
      <Card.Img variant="top" src={doctor3} height={300}/>
      <Card.Body>
        <Card.Title className='p-2'>Dr.Ramesh</Card.Title>
        <Card.Subtitle  className='p-2'><strong>Email:</strong>ramesh@gmail.com</Card.Subtitle>
        <Card.Subtitle  className='p-2'><strong>Phone:</strong>+91-987654321</Card.Subtitle>
        <Card.Subtitle  className='p-2'><strong>Speciality:</strong>Orthopedics</Card.Subtitle>
        <Card.Text>     
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    </Row>
     </Container>
    </>
  )
}

export default Doctor

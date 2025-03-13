import React,{useState} from 'react'
import {Modal,Button,Form,Container} from 'react-bootstrap';
import {FaStar} from 'react-icons/fa';
import axios from 'axios';
import Feedback from 'react-bootstrap/esm/Feedback';
const DoctorFeedback = () => {
  const[show,setShow]=useState(false);
  const[patinetName,setPatientName]=useState('');
  const[doctor,setDoctor]=useState('');
  const[rating,setRating]=useState(0);
  const[feedback,setFeedback]=useState('');
  const[hover,setHover]=useState(null);

  const handleClose=()=>{
    setShow(false);
  }
  const handleShow=()=>{
    setShow(true);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(patinetName,doctor,rating,Feedback);
    handleClose();
  };

  return (
   <>
    <Container className='text-center'>
      <Button variant="primary" onClick={handleShow}>
        Give Feedback
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Doctor Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

          {/* Patient Name */}
            <Form.Group className='mb-3'>
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
               type="text"
               placeholder='Enter your name'
               value={patinetName}
               onChange={(e)=>setPatientName(e.target.value)}
               /> 
            </Form.Group>

            {/* Doctor Selection */}
            <Form.Group className='mb-3'>
              <Form.Label>Select Doctor</Form.Label>
              <Form.Select 
                value={doctor}
                onChange={(e)=>setDoctor(e.target.value)}
                required>
               <option value=''>Select a doctor</option>
               <option value='Dr.Suman'>Dr.Suman</option>
                <option value='Dr.Sneha'>Dr.Sneha</option>
                <option value='Dr.Manisha'>Dr.Mainsha</option>
                <option value='Dr.Ravi'>Dr.Ravi</option>
              </Form.Select>
            </Form.Group>

            {/* Rating */}
            <Form.Group className="mb-3">
              <Form.Label>Rate the Doctor</Form.Label>
              <div>
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      style={{ cursor: "pointer", marginRight: 5 }}
                      color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(currentRating)}
                    />
                  );
                })}
              </div>
            </Form.Group>

            {/* Feedback Textarea */}
            <Form.Group className="mb-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit Feedback
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
   </>
  )
}

export default DoctorFeedback

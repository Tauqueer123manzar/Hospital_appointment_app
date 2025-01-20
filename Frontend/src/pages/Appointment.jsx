// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
// // import RazorpayPayment from './Paymentgateway';
// import Footer from '../components/Footer';
// import Topbar from '../components/Topbar';
// import appointment from '../assets/appointment page.png';

// const AppointmentForm = () => {
//   const [formData, setFormData] = useState({
//     patientname: "",
//     specialization: "",
//     doctorname: "",
//     appointmentdate:""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [timeSlot, setTimeSlot] = useState('');
//   const [appointmentdate,setAppointmentdate]=useState('');

//   const specializationData = [
//     "Pediatrics",
//     "Orthopedics",
//     "Cardiology",
//     "Neurology",
//     "Oncology",
//     "Radiology",
//     "Physical Therapy",
//     "Dermatology",
//     "ENT",
//   ];

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   const handleSpecializationChange = (e) => {
//     const selectedSpecialization = e.target.value;
//     setFormData({ ...formData, specialization: selectedSpecialization, doctorname: '' });
//     setSelectedDoctor(null); // Reset doctor when specialization changes
//     setTimeSlot('');// Reset time slot
//     setAppointmentdate('') // Reset appointment date
//   };

//   const handleDoctorChange = (e) => {
//     const selectedDoctorName = e.target.value;
//     const doctor = doctorsData
//       .find(data => data.specialization === formData.specialization)
//       ?.doctors.find(doc => doc.name === selectedDoctorName);

//     setFormData({ ...formData, doctorname: selectedDoctorName });
//     setSelectedDoctor(doctor);
//     setTimeSlot(''); // Reset time slot
//   };

//   const handleDayChange = (e) => {
//     setTimeSlot(''); // Reset time slot when day changes
//   };

//   return (
//     <>
//       <Topbar />
//       <Container fluid style={{ width: "100%",maxHeight:"100vh",overflow:"scroll",overflowY:"scroll",overflowX:"hidden",padding: 0}}>
//         <div style={{ width: "100%", position: "relative" }}>
//           <img
//             src={appointment}
//             style={{
//               width: "100%",
//               height:"100%",
//               objectFit: "cover",
//               position: "absolute",
//               top: "0",
//               left: "0",
//               bottom:"0",
//               zIndex: "-1",
//               overflow:"scroll",
//               overflowY:"scroll",
//               overflowX:"hidden"
//             }}
//             alt="Appointment Banner"
//           />
//           <h1 className='p-5 mt-5' style={{ fontWeight: "bold", color: "white", fontFamily: "initial"}}>
//             Book an Appointment
//           </h1>
//           <Col xs={12} lg={12} md={12} className='d-flex justify-content-center align-items-center'>
//             <Card className='shadow-lg p-5 bg-white rounded mb-5' style={{width:"750px"}}>
//               <Form>
//                 <Row className="mb-0">
//                 <h3 className='text-center' style={{fontFamily:"initial",fontWeight:"600"}}>Appointment Booking</h3>
//                   <Col className='mt-3'>
//                     <Form.Group controlId="patientName">
//                       <Form.Label style={{fontWeight:"700",fontFamily:"inherit"}}>Patient Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter your name"
//                         name='patientname'
//                         value={formData.patientname}
//                         onChange={handleChange}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col className='mt-3'>
//                     <Form.Group controlId="specialization">
//                       <Form.Label style={{fontWeight:"700",fontFamily:"inherit"}}>Specialization</Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="specialization"
//                         value={formData.specialization}
//                         onChange={handleSpecializationChange}
//                       >
//                         <option>Select Specialization</option>
//                         {specializationData.map((specialization, index) => (
//                           <option key={index} value={specialization}>
//                             {specialization}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Col className='mt-2'>
//                    <Form.Group controlId='appointmentdate'>
//                     <Form.Label style={{fontWeight:"700",fontFamily:"inherit"}}>Appointment Date</Form.Label>
//                     <Form.Control
//                      type='date'
//                      name='appointmentdate'
//                      value={formData.appointmentdate}
//                      onChange={handleChange}
//                      >
//                     </Form.Control>
//                    </Form.Group>
//                 </Col>
//                 <Form.Group controlId="doctorName" className='mb-3 mt-3'>
//                   <Form.Label style={{fontWeight:"700",fontFamily:"inherit"}}>Doctor Name</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name='doctorname'
//                     value={formData.doctorname}
//                     onChange={handleDoctorChange}
//                     disabled={!formData.specialization}
//                   >
//                     <option>Select Doctor</option>
//                     {doctorsData
//                       .filter(data => data.specialization === formData.specialization)
//                       .flatMap(data => data.doctors)
//                       .map((doctor, index) => (
//                         <option key={index} value={doctor.name}>{doctor.name}</option>
//                       ))}
//                   </Form.Control>
//                 </Form.Group>


//                 {/* Time Slot */}
//                 <Form.Group controlId="timeSlot" className='mb-3'>
//                   <Form.Label style={{fontWeight:"700",fontFamily:"inherit"}}>Select Time Slot</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={timeSlot}
//                     onChange={(e) => setTimeSlot(e.target.value)}
//                   >
//                     <option>Select Time Slot</option>
//                     {selectedDoctor && selectedDoctor.availableTimings[0]?.map((time, index) => (
//                       <option key={index} value={time}>{time}</option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>

//                 {/* Display Selected Doctor Details and Time Slot */}
//                 {selectedDoctor && (
//                   <Card className="my-4">
//                     <Card.Body>
//                       <Card.Title>{selectedDoctor.name}</Card.Title>
//                       <Card.Text>
//                         Specialization: {formData.specialization} <br />
//                         Consultation Charge: ₹{selectedDoctor.charge} <br />
//                         Selected Time Slot: {timeSlot}<br/>
//                         appointmentdate:{formData.appointmentdate}
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 )}

//                 {/* Razorpay Payment Button */}
//                 {selectedDoctor && timeSlot && (
//                   <Button className="btn btn-primary mt-4">
//                     Pay ₹{selectedDoctor.charge} and Confirm
//                   </Button>
//                 )}
//               </Form>
//             </Card>
//           </Col>
//         </div>
//         <Footer/>
//       </Container>
//     </>
//   );
// };

// export default AppointmentForm;

import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import appointment from '../assets/appointment page.png';

const Appointment = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    specialization: "",
    doctorName: "",
    appointmentDate: "",
    hasVisited: false,
    status: "Pending",
    doctorId: "",
    patientId: "1234567890", // Example patient ID (use logged-in user ID dynamically)
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const specializationData = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Radiology",
    "Dermatology",
    "Oncology",
    "ENT"
  ];
  const doctorsData = [
    {
      specialization: "Pediatrics",
      doctors: [
        { id: "doc1", name: "Dr. Smith", availableTimings: ["9:00 AM", "10:00 AM"], charge: 500 },
        // Add more doctors...
      ],
    },
    // Add more specializations and doctors...
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpecializationChange = (e) => {
    const selectedSpecialization = e.target.value;
    setFormData({ ...formData, specialization: selectedSpecialization, doctorName: "", doctorId: "" });
    setSelectedDoctor(null);
    setTimeSlot('');
  };

  const handleDoctorChange = (e) => {
    const selectedDoctorName = e.target.value;
    const doctor = doctorsData
      .find(data => data.specialization === formData.specialization)
      ?.doctors.find(doc => doc.name === selectedDoctorName);

    setFormData({
      ...formData,
      doctorName: selectedDoctorName,
      doctorId: doctor ? doctor.id : "",
    });
    setSelectedDoctor(doctor);
    setTimeSlot('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.specialization || !formData.appointmentDate || !formData.doctorName || !timeSlot) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      const response = await fetch('/api/v1/appointment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, selectTime: timeSlot }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while booking the appointment.");
    }
  };

  return (
    <>
      <Topbar />
      <Container fluid className="p-0">
        <div className="appointment-banner">
          <img src={appointment} alt="Appointment Banner" className="w-100" />
          <h1 className="text-white text-center p-5">Book an Appointment</h1>
        </div>
        <Col xs={12} className="d-flex justify-content-center">
          <Card className="shadow-lg p-4 rounded mb-5" style={{ width: "750px" }}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="patientName">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="specialization">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control
                      as="select"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleSpecializationChange}
                    >
                      <option value="">Select Specialization</option>
                      {specializationData.map((spec, idx) => (
                        <option key={idx} value={spec}>{spec}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="appointmentDate" className="mt-3">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="doctorName" className="mt-3">
                <Form.Label>Doctor Name</Form.Label>
                <Form.Control
                  as="select"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleDoctorChange}
                  disabled={!formData.specialization}
                >
                  <option value="">Select Doctor</option>
                  {doctorsData
                    .filter(data => data.specialization === formData.specialization)
                    .flatMap(data => data.doctors)
                    .map((doc, idx) => (
                      <option key={idx} value={doc.name}>{doc.name}</option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="timeSlot" className="mt-3">
                <Form.Label>Select Time Slot</Form.Label>
                <Form.Control
                  as="select"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  disabled={!selectedDoctor}
                >
                  <option value="">Select Time Slot</option>
                  {selectedDoctor?.availableTimings.map((time, idx) => (
                    <option key={idx} value={time}>{time}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              {selectedDoctor && timeSlot && (
                <Button type="submit" className="mt-4 btn-primary">
                  Confirm Appointment
                </Button>
              )}
            </Form>
          </Card>
        </Col>
        <Footer />
      </Container>
    </>
  );
};

export default Appointment;

// import React, { useEffect,useContext }  from 'react'
// import { useNavigate } from 'react-router-dom';
// import {context} from '../../main'
// import { FaUsers } from "react-icons/fa";
// import { FaCalendarAlt} from 'react-icons/fa';
// import { FaCheck} from 'react-icons/fa';
// import {Container,Row,Table,Badge} from 'react-bootstrap';
// import Sidebar from '../../components/Sidebar'
// import '../../App.css'
// const Dashboard = () => {
//   const { isAuthenticated, setIsAuthenticated } = useContext(context);
//   const navigateTo = useNavigate();
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigateTo('/admin/login');
//     }
//   })
//   return (
//     <>
//     <Sidebar/>
//     <div style={{backgroundColor:"rgb(211, 211, 211)",Width:"100%",height:"100vh",top:"0",overflow:"scroll",overflowY:"scroll"}}>
//       <div className='values'>
//       <div className='value mt-3'>
//        <div className='val-box'>
//        <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers style={{color:"blue"}}/></i>
//         <div>
//           <span>Total Users</span>
//           <h3>10,000</h3>
//         </div>
//        </div>

//        <div className='val-box'>
//        <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaCalendarAlt color="pink" /></i>
//         <div>
//           <span>Total Appointment</span>
//           <h3>87</h3>
//         </div>
//        </div>

//        <div className='val-box'>
//        <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}> <FaCheck color="purple" /></i>
//         <div>
//           <span>Confirm Booking</span>
//           <h3>4,000</h3>
//         </div>
//        </div>

//        <div className='val-box'>
//        <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers /></i>
//         <div>
//           <span>Register Doctors</span>
//           <h3>2000</h3>
//         </div>
//        </div>
//       </div>  
//     </div>
//     </div>
//     </>
//   )
// }

// export default Dashboard


import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../../main';
import { FaUsers, FaCalendarAlt, FaCheck } from "react-icons/fa";
import { Container, Row, Col, Table, Badge, Card, Dropdown } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import '../../App.css';

const Dashboard = () => {
  const { isAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/admin/login');
    }
  }, [isAuthenticated, navigateTo]);

  const appointments = [
    { name: "Dr. Janet Hoffman", date: "Feb 15, 8:30am", type: "Telemedicine", clinic: "Paragon Shopping city medical", ref: "92831ABF23", status: "Ongoing" },
    { name: "Dr. Marsha Bailey", date: "Feb 15, 8:30am", type: "In-house", clinic: "Paragon Shopping city medical", ref: "92831ABF23", status: "Due" },
    { name: "Dr. Eva Zimmerman", date: "Feb 15, 8:30am", type: "Chamber", clinic: "Paragon Shopping city medical", ref: "92831ABF23", status: "Postponed" },
    { name: "Dr. Seth Swanson", date: "Feb 15, 8:30am", type: "Medical", clinic: "Paragon Shopping city medical", ref: "92831ABF23", status: "Completed" },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "Ongoing": return "primary";
      case "Due": return "danger";
      case "Postponed": return "warning";
      case "Completed": return "success";
      default: return "secondary";
    }
  };

  return (
    <>
      <Sidebar />
      <div style={{ backgroundColor: "rgb(245, 245, 245)", width: "100%", minHeight: "100vh", overflow: "auto", padding: "20px",marginLeft:"250px"}}>
        <Container fluid>
          <Row className='mb-4'>
            <Col md={3}>
              <Card className='shadow-sm'>
                <Card.Body>
                  <FaUsers className="text-primary" style={{ fontSize: "35px" }} />
                  <div>
                    <span>Total Users</span>
                    <h3>10,000</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='shadow-sm'>
                <Card.Body>
                  <FaCalendarAlt className="text-danger" style={{ fontSize: "35px" }} />
                  <div>
                    <span>Total Appointments</span>
                    <h3>87</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='shadow-sm'>
                <Card.Body>
                  <FaCheck className="text-success" style={{ fontSize: "35px" }} />
                  <div>
                    <span>Confirmed Bookings</span>
                    <h3>4,000</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='shadow-sm'>
                <Card.Body>
                  <FaUsers className="text-warning" style={{ fontSize: "35px" }} />
                  <div>
                    <span>Registered Doctors</span>
                    <h3>2,000</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className='shadow-sm'>
            <Card.Body>
              <h4>All Appointments</h4>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Consultant</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Clinic</th>
                    <th>Ref.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, index) => (
                    <tr key={index}>
                      <td>{appt.name}</td>
                      <td>{appt.date}</td>
                      <td>{appt.type}</td>
                      <td>{appt.clinic}</td>
                      <td>{appt.ref}</td>
                      <td>
                        <Badge bg={getStatusVariant(appt.status)}>
                          {appt.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-end">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    Sort by: Upcoming
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Upcoming</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Completed</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

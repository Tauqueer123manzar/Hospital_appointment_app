import React, { useEffect,useContext }  from 'react'
import { useNavigate } from 'react-router-dom';
import {context} from '../../main'
import { FaUsers } from "react-icons/fa";
import { FaCalendarAlt} from 'react-icons/fa';
import { FaCheck} from 'react-icons/fa';
import {Container,Row,Table,Badge} from 'react-bootstrap';
import Sidebar from '../../components/Sidebar'
import '../../App.css'
const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/admin/login');
    }
  })
  // const appointments = [
  //   {
  //     patient: "Jhon Doe",
  //     date: "2024-05-02",
  //     doctor: "Benjamin Reynolds",
  //     department: "Cardiology",
  //     status: "Rejected",
  //     visited: false,
  //   },
  //   {
  //     patient: "Li Min Haw",
  //     date: "2024-04-28",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Accepted",
  //     visited: true,
  //   },
  //   {
  //     patient: "Alex Michael",
  //     date: "2024-06-01",
  //     doctor: "Harper Nelson",
  //     department: "Radiology",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-05-26",
  //     doctor: "Noah Johnson",
  //     department: "ENT",
  //     status: "Accepted",
  //     visited: false,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-09-27",
  //     doctor: "Harper Nelson",
  //     department: "Radiology",
  //     status: "Accepted",
  //     visited: false,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  //   {
  //     patient: "Zeeshan Khan",
  //     date: "2024-10-25",
  //     doctor: "Olivia White",
  //     department: "Orthopedics",
  //     status: "Pending",
  //     visited: true,
  //   },
  // ];
  return (
    <>
    <Sidebar/>
    <div style={{backgroundColor:"rgb(211, 211, 211)",Width:"100%",height:"100vh",top:"0",overflow:"scroll",overflowY:"scroll"}}>
      <div className='values'>
      {/* <h1 className='text-center mt-2'>Admin Dashboard</h1> */}
      <div className='value mt-3'>
       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers style={{color:"blue"}}/></i>
        <div>
          <span>Total Users</span>
          <h3>10,000</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaCalendarAlt color="pink" /></i>
        <div>
          <span>Total Appointment</span>
          <h3>87</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}> <FaCheck color="purple" /></i>
        <div>
          <span>Confirm Booking</span>
          <h3>4,000</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers /></i>
        <div>
          <span>Register Doctors</span>
          <h3>2000</h3>
        </div>
       </div>
      </div>  
    </div>

    {/* <Container fluid className=' dashboard-container' style={{marginLeft:"310px"}}>
       <Row className=''>
       <h1 style={{fontFamily:"initial",fontWeight:"550",marginLeft:"20px"}}>Appointments</h1>
       <Table striped bordered hover responsive>
          <thead>
          <tr>
           <th>Patient</th>
           <th>Date</th>
           <th>Doctor</th>
           <th>Department</th>
           <th>Status</th>
           <th>Visited</th>
          </tr>
          </thead>
          <tbody>
          {appointments.map((appt, index) => (
            <tr key={index}>
              <td>{appt.patient}</td>
              <td>{appt.date}</td>
              <td>{appt.doctor}</td>
              <td>{appt.department}</td>
              <td>
                <Badge
                  pill
                  variant={
                    appt.status === "Accepted"
                      ? "success"
                      : appt.status === "Pending"
                      ? "warning"
                      : "danger"
                  }
                >
                  {appt.status}
                </Badge>
              </td>
              <td>
                {appt.visited ? (
                  <Badge pill variant="success">
                    ✅
                  </Badge>
                ) : (
                  <Badge pill variant="danger">
                    ❌
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
       </Row>
    </Container> */}
    </div>
    </>
  )
}

export default Dashboard

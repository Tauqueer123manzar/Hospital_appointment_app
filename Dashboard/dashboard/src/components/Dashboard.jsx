import React from 'react'
import '../App.css'
import { FaUsers } from "react-icons/fa";
import { FaCalendarAlt} from 'react-icons/fa';
import { FaCheck} from 'react-icons/fa';
const Dashboard = () => {
  return (
    <div style={{backgroundColor:"rgb(211, 211, 211)",Width:"100%",height:"99vh",top:"0"}}>
      <div className='values'>
      <h1>Dashboard</h1>
      <div className='value'>
       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers style={{color:"blue"}}/></i>
        <div>
          <span>New Users</span>
          <h3>10,000</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaCalendarAlt color="pink" /></i>
        <div>
          <span>Appointment</span>
          <h3>8,267</h3>
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
    </div>
  )
}

export default Dashboard

import React, { useEffect,useContext, useState,useMemo}  from 'react'
import { useNavigate } from 'react-router-dom';
import {useTable,usePagination,useSortBy} from 'react-table';
import DataTable from 'react-data-table-component';
import { Container, Table, Button, Form } from "react-bootstrap";
import {context} from '../../main'
import { FaUsers } from "react-icons/fa";
import { FaCalendarAlt} from 'react-icons/fa';
import { FaCheck} from 'react-icons/fa';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'
import '../../App.css'
const Dashboard = () => {
  const { isAuthenticated} = useContext(context);
  const navigateTo = useNavigate();

  const [totalUsers,setTotalUsers]=useState(0);
  const [totalAppointments,setTotalAppointments]=useState(0);
  const [confirmedAppointments,setConfirmedAppointments]=useState(0);
  const [totalDoctors,setTotalDoctors]=useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/admin/login');
    }

  // fetch all users
  const fetchUsers=async()=>{
    try {
      const res=await axios.get("http://localhost:8080/api/v1/user/getallusers");
      setTotalUsers(res.data.users.length);
      console.log("Users:",res.data.users);
    }catch(error){
      console.log(error);
      console.log("Error fetching users:",error);
    }
  };

  // fetch all appointments
  const fetchAllAppointments=async()=>{
    try {
      const res=await axios.get("http://localhost:8080/api/v1/appointment/getall");
      setTotalAppointments(res.data.appointments.length);
      
      // filter confirmed appointments
      // const confirmedAppointments=res.data.appointments.filter(appointment=>appointment.status==="confirmed").length;
      // setConfirmedAppointments(confirmedAppointments);
    } catch (error) {
      console.log("Error");
      console.error("Error fetching appointments:",error);
    }
  };

  //fetch all doctors
  const fetchAllDoctors=async()=>{
    try {
      const res=await axios.get("http://localhost:8080/api/v1/user/doctors");
      setTotalDoctors(res.data.doctors.length);
    } catch (error) {
      console.error("Error fetching doctors:",error);
      console.log("Error");
    }
  };

  // call Api functions
    fetchUsers();
    fetchAllAppointments();
    fetchAllDoctors();

  // Refresh data every 10 seconds for real-time updates
  const interval=setInterval(()=>{
    fetchUsers();
    fetchAllAppointments();
    fetchAllDoctors();
  },10000);
  return ()=> clearInterval(interval);
}, [isAuthenticated,navigateTo]);


  return (
    <>
    <Sidebar/>
    <div style={{backgroundColor:"rgb(211, 211, 211)",Width:"100%",height:"100vh",top:"0",overflow:"scroll",overflowY:"scroll"}}>
    <h3 style={{marginLeft:"280px",color:"blue"}} className='text-center mt-2 font-weight-bold'>Admin Dashboard</h3>
      <div className='values'>
      <div className='value mt-3'>
       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers style={{color:"blue"}}/></i>
        <div>
          <span>Total Users</span>
          <h3>{totalUsers}</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaCalendarAlt color="pink" /></i>
        <div>
          <span>Total Appointment</span>
          <h3>{totalAppointments}</h3>
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
          <h3>{totalDoctors}</h3>
        </div>
       </div>
      </div>  
    </div>
    </div>
    </>
  )
}

export default Dashboard



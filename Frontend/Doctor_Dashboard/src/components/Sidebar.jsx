import React, { useEffect,useState, useContext } from 'react'
import { context } from '../main'
import { TiHome } from "react-icons/ti";
import { FaUserDoctor } from "react-icons/fa6";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import '../App.css'

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo("/");
    setShow(!show);
  }

  const gotoAppointment = () => {
    navigateTo("/appointment");
    setShow(!show);
  }

  const gotoprofile=()=>{
    navigateTo("/profile");
    setShow(!show);
  }

  const handlelogout = () => {
    try {
      toast.success("Doctor Logged out successfully");
      localStorage.clear();
      setIsAuthenticated(false);
      navigateTo("/login")
      console.log("isAuthenticated", isAuthenticated);
    } catch (error) {
      console.log("error in logout:", error);
      toast.error(error);
    }
  }


  useEffect(() => {
    console.log("isAuthenticated in sidebar", isAuthenticated);

  }, [isAuthenticated])



  return (
    <>
         {
         isAuthenticated ? <nav
          style={isAuthenticated ? { display: "flex" } : { display: "none" }}
          className={show ? "show sidebar" : "sidebar"}>
          <h1 className='' style={{fontWeight:"700",fontFamily:"initial"}}>Dashboard</h1>
          <div className='links'>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><TiHome onClick={gotoHome} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><i class="fa-solid fa-calendar-check" onClick={gotoAppointment} style={{ fontSize: "40px" }}></i></li>
            <li className='items' style={{ textDecoration:"none",  listStyle:"none"}}><i class="fa-solid fa-user-doctor" onClick={gotoprofile} style={{fontSize:"40px"}}></i></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><RiLogoutBoxRFill onClick={handlelogout} style={{ fontSize: "40px" }} /></li>
          </div>
        </nav> : ''
      }

    </>
  )
}

export default Sidebar

import React, { useEffect } from 'react'
import { context } from '../main'
import { useState, useContext } from 'react';
import { TiHome } from "react-icons/ti";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
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
    navigateTo("/admin");
    setShow(!show);
  }

  const gotoDoctorspage = () => {
    navigateTo("/doctors");
    setShow(!show);
  }

  const gotomessages = () => {
    navigateTo("/messages");
    setShow(!show);
  }

  const gotoAddnewdoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  }

  const gotoAddnewadmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  }

  const handlelogout = () => {
    try {
      toast.success("Admin Logged out successfully");
      localStorage.clear();
      navigateTo("/login")
      setIsAuthenticated(false);
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
          <h1 style={{fontFamily:"initial",fontWeight:"bold"}}>Dashboard</h1>
          <div className='links'>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><TiHome onClick={gotoHome} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><FaUserDoctor onClick={gotoDoctorspage} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><MdAddModerator onClick={gotoAddnewadmin} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><IoPersonAddSharp onClick={gotoAddnewdoctor} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><RiMessage2Fill onClick={gotomessages} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><RiLogoutBoxRFill onClick={handlelogout} style={{ fontSize: "40px" }} /></li>
          </div>
        </nav> : ''
      }

    </>
  )
}

export default Sidebar

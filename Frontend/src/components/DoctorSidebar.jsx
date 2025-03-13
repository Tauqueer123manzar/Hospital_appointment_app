import React, { useState, useContext } from 'react';
import { context } from '../main';
import { TiHome } from "react-icons/ti";
import { FaUserDoctor } from "react-icons/fa6";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { Navbar, Offcanvas, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import '../sidebar.css';

const DoctorSidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    try {
      toast.success("Doctor Logged out successfully");
      localStorage.clear();
      navigateTo("/doctor/login");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    { icon: <TiHome />, name: "Dashboard", action: () => navigateTo("/doctor/dashboard") },
    { icon: <FaUserDoctor />, name: "Doctors", action: () => navigateTo("/doctorprofile") },
    { icon: <TbReportSearch />, name: "Reports", action: () => navigateTo("/reports") },
    { icon: <IoChatbubbleEllipsesSharp />, name: "Chats", action: () => navigateTo("/chats") },
    { icon: <RiLogoutBoxRFill />, name: "Logout", action: handleLogout },
  ];

  return (
    isAuthenticated && (
      <>
        {/* Top Navbar */}
        <Navbar className="bg-primary p-2 d-md-none">
          <Button variant="light" onClick={() => setShow(true)}>☰ Menu</Button>
        </Navbar>

        {/* Offcanvas Sidebar */}
        <Offcanvas show={show} onHide={() => setShow(false)} className="sidebar" responsive="md">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="sidebar-title">EASY CARE</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column sidebar-links">
              {menuItems.map((item, index) => (
                <Nav.Link key={index} className="sidebar-item" onClick={() => { item.action(); setShow(false); }}>
                  {item.icon} <span className="sidebar-text">{item.name}</span>
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  );
};

export default DoctorSidebar;

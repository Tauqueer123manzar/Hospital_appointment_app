import React, { useState, useContext } from 'react';
import { context } from '../main';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Navbar, Offcanvas, Nav, Button } from 'react-bootstrap';
import {
  FiHome,
  FiUser,
  FiFileText,
  FiMessageSquare,
  FiMenu,
  FiLogOut
} from 'react-icons/fi';

const DoctorSidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked"); // Debug log
    try {
      localStorage.clear();
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      navigateTo("/doctor/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    { icon: <FiHome size={20} />, name: "Dashboard", path: "/doctor/dashboard" },
    { icon: <FiUser size={20} />, name: "Profile", path: "/doctorprofile" },
    { icon: <FiFileText size={20} />, name: "Reports", path: "/reports" },
    { icon: <FiMessageSquare size={20} />, name: "Messages", path: "/chats" },
    
  ];

  const sidebarItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#000",
  };

  return (
    isAuthenticated && (
      <>
        {/* Mobile Top Navbar */}
        <Navbar className="bg-white shadow-sm p-2 d-md-none fixed-top">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <span className="text-primary fw-bold">EASY CARE</span>
            <Button
              variant="outline-primary"
              onClick={() => setShow(true)}
              className="border-0"
            >
              <FiMenu size={24} />
            </Button>
          </div>
        </Navbar>

        {/* Desktop Sidebar */}
        <div className="d-none d-md-block position-fixed" style={{
          width: '240px',
          height: '100vh',
          backgroundColor: '#fff',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          paddingTop: '60px'
        }}>
          <div className="p-4">
            <h4 className="text-primary fw-bold">EASY CARE</h4>
            <small className="text-muted">Doctor Portal</small>
          </div>
          <Nav className="flex-column px-3">
            {menuItems.map((item, index) => (
              <div
                key={index}
                style={sidebarItemStyle}
                onClick={() => navigateTo(item.path)}
              >
                <span className="me-3">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
            <div
              style={{ ...sidebarItemStyle, color: "red", marginTop: "20px" }}
              onClick={handleLogout}
            >
              <span className="me-3"><FiLogOut size={20} /></span>
              <span>Logout</span>
            </div>
          </Nav>
        </div>

        {/* Mobile Offcanvas Sidebar */}
        <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="text-primary fw-bold">EASY CARE</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  style={sidebarItemStyle}
                  onClick={() => {
                    navigateTo(item.path);
                    setShow(false);
                  }}
                >
                  <span className="me-3">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
              <div
                style={{ ...sidebarItemStyle, color: "red", marginTop: "20px" }}
                onClick={() => {
                  handleLogout();
                  setShow(false);
                }}
              >
                <span className="me-3"><FiLogOut size={20} /></span>
                <span>Logout</span>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  );
};

export default DoctorSidebar;

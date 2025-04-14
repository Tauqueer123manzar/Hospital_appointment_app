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
  FiLogOut,
  FiMenu 
} from 'react-icons/fi';
import '../App.css';

const DoctorSidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    try {
      toast.success("Logged out successfully");
      localStorage.clear();
      setIsAuthenticated(false);
      navigateTo("/doctor/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    { icon: <FiHome size={20} />, name: "Dashboard", action: () => navigateTo("/doctor/dashboard") },
    { icon: <FiUser size={20} />, name: "Profile", action: () => navigateTo("/doctorprofile") },
    { icon: <FiFileText size={20} />, name: "Reports", action: () => navigateTo("/reports") },
    { icon: <FiMessageSquare size={20} />, name: "Messages", action: () => navigateTo("/chats") },
    { icon: <FiLogOut size={20} />, name: "Logout", action: handleLogout },
  ];

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
        <div className="d-none d-md-block sidebar-desktop bg-white shadow">
          <div className="sidebar-header p-4">
            <h4 className="text-primary fw-bold">EASY CARE</h4>
            <small className="text-muted">Doctor Portal</small>
          </div>
          <Nav className="flex-column px-3">
            {menuItems.map((item, index) => (
              <Nav.Link 
                key={index} 
                className="sidebar-item py-3 px-3 my-1 rounded"
                onClick={item.action}
              >
                <div className="d-flex align-items-center">
                  <span className="sidebar-icon me-3">{item.icon}</span>
                  <span className="sidebar-text">{item.name}</span>
                </div>
              </Nav.Link>
            ))}
          </Nav>
        </div>

        {/* Mobile Offcanvas Sidebar */}
        <Offcanvas 
          show={show} 
          onHide={() => setShow(false)} 
          responsive="md"
          className="sidebar-mobile"
          placement="start"
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="text-primary fw-bold">EASY CARE</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column">
              {menuItems.map((item, index) => (
                <Nav.Link 
                  key={index} 
                  className="sidebar-item py-3 px-4"
                  onClick={() => { 
                    item.action(); 
                    setShow(false); 
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span className="sidebar-icon me-3">{item.icon}</span>
                    <span className="sidebar-text">{item.name}</span>
                  </div>
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
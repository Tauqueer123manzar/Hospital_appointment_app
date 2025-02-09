import React, { useEffect, useState, useContext } from 'react';
import { context } from '../main';
import { TiHome } from "react-icons/ti";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiMessage2Fill, RiLogoutBoxRFill } from "react-icons/ri";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
// import '../App.css';
import '../sidebar.css';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const toggleSidebar = () => setShow(!show);

  const menuItems = [
    { icon: <TiHome className="sidebar-icon" />, name: "Home", action: () => navigateTo("/admin") },
    { icon: <FaUserDoctor className="sidebar-icon" />, name: "Doctors", action: () => navigateTo("/doctors") },
    { icon: <MdAddModerator className="sidebar-icon" />, name: "Add Admin", action: () => navigateTo("/admin/addnew") },
    { icon: <IoPersonAddSharp className="sidebar-icon" />, name: "Add Doctor", action: () => navigateTo("/doctor/addnew") },
    { icon: <RiMessage2Fill className="sidebar-icon" />, name: "Messages", action: () => navigateTo("/messages") },
    { icon: <IoChatbubbleEllipsesSharp className="sidebar-icon" />, name: "Chats", action: () => navigateTo("/chats") },
    { icon: <RiLogoutBoxRFill className="sidebar-icon" />, name: "Logout", action: handleLogout },
  ];

  function handleLogout() {
    try {
      toast.success("Admin Logged out successfully");
      localStorage.clear();
      navigateTo("/admin/login");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error("Logout failed");
    }
  }

  useEffect(() => {
    console.log("isAuthenticated in sidebar", isAuthenticated);
  }, [isAuthenticated]);

  return (
    isAuthenticated && (
      <nav className={`sidebar ${show ? "show" : ""}`}>
        <p className="sidebar-title mb-4">EASY CARE</p>
        <ul className='sidebar-links'>
          {menuItems.map((item, index) => (
            <li key={index} className='sidebar-item' onClick={item.action}>
              {item.icon} <span className="sidebar-text">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Sidebar;


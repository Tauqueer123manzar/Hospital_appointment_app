import './App.css'
import { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { context } from './main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appointment from './components/Appointment';
import Profile from './components/Profile';
function App() {
 const {isAuthenticated,setIsAuthenticated}=useContext(context);

 useEffect(()=>{
  if(localStorage.getItem("doctorToken")){
   setIsAuthenticated(true);
  }
 },[]);
   
  return (
    <>
     <Router>
     <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
     </Router>
     <ToastContainer position='top-center'/>
    </>
  )
}

export default App

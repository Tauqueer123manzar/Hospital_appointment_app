import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import Services from './pages/Services'
import Contactus from './pages/Contactus'
import MyProfile from './pages/MyProfile'
import MyAppointment from '../src/pages/MyAppointments'
import Doctorprofile from './components/Doctorprofile'
import Alldoctor from './pages/Alldoctor'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import AdminLogin from './pages/Admin/AdmiLogin'
import Dashboard from './pages/Admin/Dashboard'
import Doctors from './pages/Admin/Doctors'
import AddnewDoctor from './pages/Admin/AddnewDoctor'
import AddnewAdmin from './pages/Admin/AddnewAdmin'
import Message from './pages/Admin/Message'
import DoctorLogin from './pages/Doctor/DoctorLogin'
import DoctorDashboard from './pages/Doctor/Dashboard';
import Feedback from './pages/Admin/Feedback';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {context} from './main';
// import axios from 'axios'
import './App.css'
import DoctorFeedback from './components/DoctorFeedback'
function App() {
  const {isAuthenticated,setIsAuthenticated}=useContext(context);

  const fetchUser=async()=>{
    if(localStorage.getItem("token")){
      setIsAuthenticated(true)
    }
  }
  useEffect(()=>{
    fetchUser();
  },[isAuthenticated]);

  useEffect(()=>{
    if(localStorage.getItem("adminToken")){
      setIsAuthenticated(true)
    }
  },[]);
  
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/service' element={<Services/>}/>
        <Route path='/contact' element={<Contactus/>}/>
        <Route path='/myprofile' element={<MyProfile/>}/>
        <Route path='/myappointment' element={<MyAppointment/>}/>
        <Route path='/alldoctors' element={<Alldoctor/>}/>
        <Route path='/doctor/:id' element={<Doctorprofile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctor/addnew' element={<AddnewDoctor/>}/>
        <Route path='/admin/addnew' element={<AddnewAdmin/>}/>
        <Route path='/messages' element={<Message/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/doctor/login' element={<DoctorLogin />} />
        <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
      </Routes>
      <ToastContainer position="top-center"/>
     </Router> 
    </>
  ) 
}

export default App

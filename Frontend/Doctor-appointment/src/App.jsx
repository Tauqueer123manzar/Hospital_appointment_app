import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import Services from './pages/Services'
import Contactus from './pages/Contactus'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/service' element={<Services/>}/>
        <Route path='/contact' element={<Contactus/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/> 
      </Routes>
      <ToastContainer position="top-center"/>
     </Router> 
    </>
  ) 
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useContext,useEffect} from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/AddNewAdmin';
import Message from './components/Message';
import Doctor from './components/Doctor';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {context} from './main';
import './App.css'
function App() {
 const {isAuthenticated,setIsAuthenticated,setUser}=useContext(context);

 useEffect(()=>{
  const fetchUser=async()=>{
    try {
      const response=await axios.get("http://localhost:8080/api/v1/user/admin/me",{
        withCredentials:true
      });
      setIsAuthenticated(true);
      setUser(response.data.user_id);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
 },[isAuthenticated]);

  return (
    <>
       <Router>
       <Sidebar/>
        <Routes>
          <Route path='/admin' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
          <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
          <Route path='/messages' element={<Message/>}/>
          <Route path='/doctors' element={<Doctor/>}/>
        </Routes>
        <ToastContainer position="top-center"/>
       </Router>
    </>
  )
}

export default App

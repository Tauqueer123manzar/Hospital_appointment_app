import './App.css'
import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sidebar' element={<Sidebar/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App

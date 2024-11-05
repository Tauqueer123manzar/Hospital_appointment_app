import React, { useEffect,useContext }  from 'react'
import { useNavigate } from 'react-router-dom';
import { context } from '../main'
import '../App.css'
import { FaUsers } from "react-icons/fa";
import { FaCalendarAlt} from 'react-icons/fa';
import { FaCheck} from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import photo from '../assets/file (4) 4.png'
import photo1 from '../assets/file (5) 4.png'
const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/login');
    }
  })
  return (
    <div style={{backgroundColor:"rgb(211, 211, 211)",Width:"100%",height:"99vh",top:"0"}}>
      <div className='values'>
      <div className='value mt-3'>
       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers style={{color:"blue"}}/></i>
        <div>
          <span>Total Users</span>
          <h3>10,000</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaCalendarAlt color="pink" /></i>
        <div>
          <span>Total Appointment</span>
          <h3>87</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}> <FaCheck color="purple" /></i>
        <div>
          <span>Confirm Booking</span>
          <h3>4,000</h3>
        </div>
       </div>

       <div className='val-box'>
       <i style={{fontSize:"35px",fontWeight:"700",marginLeft:"20px"}}><FaUsers /></i>
        <div>
          <span>Register Doctors</span>
          <h3>2000</h3>
        </div>
       </div>
      </div>

      <Table striped bordered hover responsive className='mt-2 rounded'>
       <thead>
        <tr>
          <td>Name</td>
          <td>Title</td>
          <td>Status</td>
          <td>Role</td>
          <td>Edit</td>
        </tr>
       </thead>
       <tbody>
        <tr>
          <td class="people d-flex">
            <img  style={{width:"120px",height:"70px"}} src={photo1} alt=" "/>
            <div class="people-de">
               <h5>Tauqueer manzar</h5>
               <p>tauqueer@example.com</p>
            </div>
          </td>
         
           <td class="people-des">
              <h5>Software Engineer</h5>
              <p>Web dev</p>
           </td>

           <td class="active">
              <p>Active</p> 
           </td>

           <td class="Role">
              <p>Owner</p>
           </td>

           <td class="edit"><a href="#">edit</a></td>
        </tr>

        <tr>
          <td class="people d-flex">
            <img style={{width:"120px",height:"70px"}} src={photo1} alt=" "/>
            <div class="people-de">
               <h5>John Doe</h5>
               <p>john@example.com</p>
            </div>
          </td>
         
           <td class="people-des">
              <h5>Software Engineer</h5>
              <p>Web dev</p>
           </td>

           <td class="active">
              <p>Active</p> 
           </td>

           <td class="Role">
              <p>Owner</p>
           </td>

           <td class="edit"><a href="#">edit</a></td>
        </tr>

        <tr>
          <td class="people d-flex">
            <img style={{width:"120px",height:"70px"}} src={photo1} alt=" "/>
            <div class="people-de">
               <h5>Thomas Joe</h5>
               <p>john@example.com</p>
            </div>
          </td>
         
           <td class="people-des">
              <h5>Software Engineer</h5>
              <p>Web dev</p>
           </td>

           <td class="active">
              <p>Active</p> 
           </td>

           <td class="Role">
              <p>Owner</p>
           </td>

           <td class="edit"><a href="#">edit</a></td>
        </tr>

        <tr>
          <td class="people d-flex">
            <img style={{width:"120px",height:"70px"}} src={photo1} alt=" "/>
            <div class="people-de">
               <h5>md anwar alam</h5>
               <p>mdanwar@gmail.com</p>
            </div>
          </td>
         
           <td class="people-des">
              <h5>Software Engineer</h5>
              <p>Web dev</p>
           </td>

           <td class="active">
              <p>Active</p> 
           </td>

           <td class="Role">
              <p>Owner</p>
           </td>

           <td class="edit"><a href="#">edit</a></td>
        </tr>

        <tr>
          <td class="people d-flex">
            <img style={{width:"120px",height:"70px"}} src={photo1} alt=" "/>
            <div class="people-de">
               <h5>janishar alam</h5>
               <p>janishar@gmail.com</p>
            </div>
          </td>
         
           <td class="people-des">
              <h5>Software Engineer</h5>
              <p>Web dev</p>
           </td>

           <td class="active">
              <p>Active</p> 
           </td>

           <td class="Role">
              <p>Owner</p>
           </td>

           <td class="edit"><a href="#">edit</a></td>
        </tr>

        <tr>
          <td class="people d-flex">
            <img style={{width:"120px",height:"70px"}} src={photo1} alt=" "/>
            <div class="people-de">
               <h5>Charllie kyle</h5>
               <p>charlie@example.com</p>
            </div>
          </td>
         
           <td class="people-des">
              <h5>Software Engineer</h5>
              <p>Web dev</p>
           </td>

           <td class="active">
              <p>Active</p> 
           </td>

           <td class="Role">
              <p>Owner</p>
           </td>

           <td class="edit"><a href="#">edit</a></td>
        </tr>

        <tr>
          <td class="people  d-flex">
            <img style={{width:"120px",height:"70px"}} src={photo1} alt=" "/>
            <div class="people-de">
               <h5>Charllie kyle</h5>
               <p>charlie@example.com</p>
            </div>
          </td>
         
           <td class="people-des">
              <h5>Software Engineer</h5>
              <p>Web dev</p>
           </td>

           <td class="active">
              <p>Active</p> 
           </td>

           <td class="Role">
              <p>Owner</p>
           </td>

           <td class="edit"><a href="#">edit</a></td>
        </tr>

       </tbody>
     </Table>
    </div>
    </div>
  )
}

export default Dashboard

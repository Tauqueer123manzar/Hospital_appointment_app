import React from 'react'
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Department from '../components/Department';
import MessageForm from '../components/MessageForm';
import heroimage from '../assets/hero (1).png';
import Topbar from '../components/Topbar'
import whoweare from '../assets/whoweare.png'
const Home = () => {
  return (
    <div>
     <Topbar/>
      <Hero
        title={
          "Welcome to EasyCare Clinic Your Trusted Healthcare Provider"
        }
        imageurl={heroimage}
      />
      <Biography imageurl={whoweare}/>
      <Department/>
      <MessageForm/>
    </div>
  )
}

export default Home


import React from 'react'
import Hero from '../components/Hero';
import Department from '../components/Department';
import heroimage from '../assets/hero (1).png';
import Topbar from '../components/Topbar'
import whoweare from '../assets/whoweare.png'
import Footer from '../components/Footer';
import Doctors from '../components/Doctors';
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
      <Doctors/>
      <Department/>
      <Footer/>
    </div>
  )
}

export default Home


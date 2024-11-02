import React from 'react'
import Hero from '../components/Hero';
import Department from '../components/Department';
import heroimage from '../assets/hero (1).png';
import Topbar from '../components/Topbar'
import Footer from '../components/Footer';
import { Typewriter } from 'react-simple-typewriter';
const Home = () => {
  return (
    <div>
     <Topbar/>
      <Hero
        title={
         <Typewriter 
          words={["Welcome to EasyCare Clinic Your Trusted Healthcare Provider."]}
          loop={0}
          cursorStyle="_"
          typeSpeed={100}
          deleteSpeed={60}
          delaySpeed={1000}
          />
        }
        imageurl={heroimage}
      />
      <Department/>
      <Footer/>
    </div>
  )
}

export default Home


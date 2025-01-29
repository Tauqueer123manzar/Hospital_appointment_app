import React from 'react'
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import about from '../assets/about.png';
import whoweare from '../../src/assets/whoweare.png'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer';
const AboutUs = () => {
  return (
    <>
    <Topbar/>
      <Hero
        title={
          "kkkkkkkkkkkkkkkkkkkk | EasyCare Clinic Consult"
        }
        imageurl={about}
      />
      <Biography  imageurl={whoweare}/>
      <Footer/>
    </>
  )
}

export default AboutUs


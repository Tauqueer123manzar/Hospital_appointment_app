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
          "Learn More About Us | Zeecare Medical Institute"
        }
        imageurl={about}
      />
      <Biography  imageurl={whoweare}/>
      <hr style={{border:"1px solid black"}}/>
      <Footer/>
    </>
  )
}

export default AboutUs


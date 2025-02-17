import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import NavBar from './components/NavBar'
import AboutSection from './components/AboutSection'
import FooterSection from './components/FooterSection'
import MainSection from './components/MainSection'
import ServicesSection from './components/ServicesSection'
<<<<<<< HEAD
import ContactSection from './components/ContactSection'
=======
import axiosInstance from "./utils/axiosInstance";
>>>>>>> refs/remotes/origin/main
// import './App.css'

function App() {

  return (
    <>
      <NavBar></NavBar>
      <MainSection></MainSection>
      <AboutSection></AboutSection>
      <ServicesSection></ServicesSection>
      <ContactSection></ContactSection>
      <FooterSection></FooterSection>
    </>
  )
}

export default App

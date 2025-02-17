import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/NavBar'
import AboutSection from './components/AboutSection'
import FooterSection from './components/FooterSection'
import MainSection from './components/MainSection'
import ServicesSection from './components/ServicesSection'
import './App.css'

function App() {

  return (
    <>
      <NavBar></NavBar>
      <MainSection></MainSection>
      <AboutSection></AboutSection>
      <ServicesSection></ServicesSection>
      <FooterSection></FooterSection>
    </>
  )
}

export default App

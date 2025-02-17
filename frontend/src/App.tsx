import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import AboutSection from './components/AboutSection'
import FooterSection from './components/FooterSection'
import MainSection from './components/MainSection'
import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'
import axiosInstance from "./utils/axiosInstance"
import { useAuth } from "./utils/authContext";
import { Kayttaja, InitialKayttaja } from './types'
import LoginSection from './components/LoginSection'

function App() {

  const [user, setUser] = useState<Kayttaja>(InitialKayttaja);
  const { kayttajatunnus, role, isAuthenticated } = useAuth();
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  // Hae kirjautunut käyttäjä
  useEffect(() => {
    if (kayttajatunnus) {
      const fetchUser = async () => {
        console.log("Käyttäjätunnus: ", kayttajatunnus);
        console.log("role: ", role);
        console.log("is authenticated:" + isAuthenticated)
      };
      fetchUser();
    }
  }, [backendUrl, kayttajatunnus]);


  return (
    <>
      <NavBar></NavBar>
      <MainSection></MainSection>
      <LoginSection nimi={kayttajatunnus} role={role}></LoginSection>
      <AboutSection></AboutSection>
      <ServicesSection></ServicesSection>
      <ContactSection></ContactSection>
      <FooterSection></FooterSection>
    </>
  )
}

export default App

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
  const { kayttajatunnus } = useAuth();
  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;

  // Hae kirjautunut käyttäjä
  useEffect(() => {
    if (kayttajatunnus) {
      const fetchUser = async () => {
        try {
          console.log("Käyttäjätunnus: ", kayttajatunnus);
          const response = await axiosInstance.get(`${backendUrl}/api/users`, { params: { kayttajatunnus }, });
          const nykyinenKayttaja = response.data;
          setUser((prevValues) => ({
            ...prevValues,
            kayttajatunnus: nykyinenKayttaja.kayttajatunnus,
            rooli: nykyinenKayttaja.rooli,
          }));
          console.log("Rooli: ", user.rooli);
        } catch (error) {
          console.error("There was an error fetching the data!", error);
        }
      };

      fetchUser();
    }
  }, [backendUrl, kayttajatunnus]);


  return (
    <>
      <LoginSection nimi={user.kayttajatunnus}></LoginSection>
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

import { useEffect } from 'react'
import NavBar from './components/NavBar'
import AboutSection from './components/AboutSection'
import FooterSection from './components/FooterSection'
import MainSection from './components/MainSection'
import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'
import { useAuth } from "./utils/authContext";
import ChartSection from './components/ChartSection'
import VisitorSection from './components/visitorSection'

function App() {

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
      <NavBar nimi={kayttajatunnus} role={role}></NavBar>
      <MainSection></MainSection>
      {/* <LoginSection nimi={kayttajatunnus} role={role}></LoginSection> */}
      {role === "visitor" && <VisitorSection></VisitorSection>}
      <ChartSection></ChartSection>
      <AboutSection></AboutSection>
      <ServicesSection></ServicesSection>
      <ContactSection></ContactSection>
      <FooterSection></FooterSection>
    </>
  )
}

export default App

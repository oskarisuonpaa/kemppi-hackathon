import { useEffect } from "react";
import NavBar from "./components/NavBar";
import AboutSection from "./components/AboutSection";
import FooterSection from "./components/FooterSection";
import MainSection from "./components/MainSection";
import { useAuth } from "./utils/authContext";
import ChartSection from "./components/ChartSection";
import VisitorSection from "./components/visitorSection";
import AdminPanel from "./components/adminPanel";

function App() {
  const { kayttajatunnus, role, isAuthenticated } = useAuth();
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  // Hae kirjautunut käyttäjä
  useEffect(() => {
    if (kayttajatunnus) {
      const fetchUser = async () => {
        console.log("Käyttäjätunnus: ", kayttajatunnus);
        console.log("role: ", role);
        console.log("is authenticated:" + isAuthenticated);
      };
      fetchUser();
    }
  }, [backendUrl, kayttajatunnus]);

  return (
    <>
      <NavBar nimi={kayttajatunnus} role={role}></NavBar>
      <MainSection></MainSection>
      {role === "visitor" && <VisitorSection></VisitorSection>}
      {(role === "admin" && <ChartSection></ChartSection>) ||
        (role === "viewer" && <ChartSection></ChartSection>)}

      {role === "admin" && <AdminPanel></AdminPanel>}
      <AboutSection></AboutSection>

      <FooterSection></FooterSection>
    </>
  );
}

export default App;

import NavBar from "./components/NavBar";
import FooterSection from "./components/FooterSection";
import MainSection from "./components/MainSection";
import { useAuth } from "./utils/authContext";
import ChartSection from "./components/ChartSection";
import VisitorSection from "./components/visitorSection";
import AdminPanel from "./components/adminPanel";

function App() {
  const { kayttajatunnus, role, isAuthenticated } = useAuth();

  return (
    <>
      <NavBar nimi={kayttajatunnus} role={role}></NavBar>
      <MainSection></MainSection>
      {role === "visitor" && <VisitorSection></VisitorSection>}
      {(role === "admin" && <ChartSection></ChartSection>) ||
        (role === "viewer" && <ChartSection></ChartSection>)}

      {role === "admin" && <AdminPanel></AdminPanel>}

      <FooterSection></FooterSection>
    </>
  );
}

export default App;

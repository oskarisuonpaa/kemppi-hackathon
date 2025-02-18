import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext.tsx";
import { checkTokenValidity } from "../utils/authUtils";

interface Props {
  nimi: string | null;
  role: string | null;
}

const NavBar: React.FC<Props> = ({ nimi }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { setKayttajatunnus } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/login`, { username, password });
      console.log(response.data.token, username, response.data.role)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", response.data.role)

      setKayttajatunnus(username);
      window.location.reload();
    } catch (error) {
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const handleClickVisitor = () => {
    console.log("Visitor clicked");
    if (localStorage.getItem("role") == "visitor") {
      localStorage.setItem("role", "")
    } else {
      localStorage.setItem("role", "visitor");
    }
    window.location.reload();
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && checkTokenValidity(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbarScroll navbar-dark">
        <div className="container">
          <img className="logo" src="/images/logo.png" alt="" />
          <a className="navbar-brand display-2 tk-myriad-pro" href="#">Team Name</a>
          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <a className="nav-link tk-proxima-nova" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link tk-proxima-nova" href="#about">Data</a>
              </li>
              <li className="nav-item">
                <a className="nav-link tk-proxima-nova" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link tk-proxima-nova" href="#contact">Contact service</a>
              </li>
            </ul>

            <div>
              {isAuthenticated && nimi !== "" ?
                <><span style={{color: "gray", marginLeft: "1.2em", marginRight: "0.6em"}}>Welcome, {nimi}!</span> <button className="logout" onClick={handleLogout}>Logout</button></> :
                localStorage.getItem("role") === "visitor" ?
                  <button onClick={handleClickVisitor}>Login to see more data</button> :
                  <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>
                    <button style={{marginLeft: "1.2em"}} onClick={() => setIsOpen(!isOpen)}>Login</button>
                    {isOpen && (
                      <form onSubmit={handleSubmit}>
                        <div style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          marginTop: "8px",
                          padding: "12px",
                          background: "white",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          borderRadius: "6px",
                          zIndex: 10,
                          minWidth: "200px",
                        }}>
                          <label htmlFor="username">Käyttäjätunnus</label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Käyttäjätunnus"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                          <div style={{ marginTop: '1rem' }}>
                            <label htmlFor="password">Salasana</label>
                            <div>
                              <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Salasana"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', height: '1.75rem', fontSize: 'small' }}
                                onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                              </button>
                            </div>
                          </div>
                          <button type="submit" style={{ backgroundColor: 'blue', color: 'white', width: '100%', marginTop: '1rem' }}>
                            Login
                          </button>
                          <button onClick={handleClickVisitor}>Continue as visitor</button>
                        </div>
                      </form>
                    )}
                  </div>}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

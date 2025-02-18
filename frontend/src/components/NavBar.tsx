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
                <><span style={{ color: "#f57300", marginLeft: "1.2em", marginRight: "0.6em" }}>Welcome, {nimi}!</span> <button className="logout btn" onClick={handleLogout}>Logout</button></> :
                localStorage.getItem("role") === "visitor" ?
                  <button className="login_btn btn btn-outline-dark" onClick={handleClickVisitor}>Login to see more data</button> :
                  <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>
                    <button className="login_btn btn btn-outline-dark" style={{ marginLeft: "1.2em" }} onClick={() => setIsOpen(!isOpen)}>Login</button>
                    {isOpen && (
                      <form onSubmit={handleSubmit} className="position-relative">
                        <div className="position-absolute top-100 end-0 mt-2 p-3 bg-white shadow rounded" style={{ minWidth: "250px", zIndex: 10 }}>

                          {/* Käyttäjätunnus */}
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-bold">Käyttäjätunnus</label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              className="form-control"
                              placeholder="Käyttäjätunnus"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>

                          {/* Salasana + Checkbox */}
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold">Salasana</label>
                            <div className="input-group">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Salasana"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <div className="input-group-text">
                                <input
                                  type="checkbox"
                                  id="showPassword"
                                  checked={showPassword}
                                  onChange={togglePasswordVisibility}
                                />
                              </div>
                            </div>
                            <label htmlFor="showPassword" className="form-check-label mt-1">Näytä salasana</label>
                          </div>

                          {/* Napit */}
                          <button type="submit" className="btn btn-dark w-100 fw-bold mb-2">
                            Login
                          </button>
                          <button type="button" className="btn btn-outline-dark w-100 fw-bold" onClick={handleClickVisitor}>
                            Continue as visitor
                          </button>

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

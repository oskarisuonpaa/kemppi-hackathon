import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/authContext.tsx";
import { checkTokenValidity } from "../utils/authUtils";

interface Props {
    nimi: string | null;
}

const LoginSection: React.FC<Props> = ({nimi}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const { setKayttajatunnus } = useAuth();
    const [show, setShow] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleClick = () => setShow(!show);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/api/login`, { username, password });
            console.log("response got.")
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("username", username);
            setKayttajatunnus(username);
            setMessage("Login successful");
            navigate("/");
        } catch (error) {
            setMessage("Login failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
      };

      useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token && checkTokenValidity(token)) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }, []);

    return (
        <div className="App">Moi
            <p>Kirjaudu {message}</p>
            <form onSubmit={handleSubmit}>
                <div>
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
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <label htmlFor="password">Salasana</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Salasana"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ paddingRight: '4.5rem' }}
                        />
                        <button
                            type="button"
                            style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', height: '1.75rem', fontSize: 'small'}}
                            onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type="submit" style={{ backgroundColor: 'blue', color: 'white', width: '100%', marginTop: '1rem' }}>
                    Login
                </button>
            </form>
            {isAuthenticated && nimi !== "" && (
                <>Tervetuloa, {nimi}!
                  <button className="logout" onClick={handleLogout}>Log out</button>
                </>
              )}
        </div>

    );
};

export default LoginSection;
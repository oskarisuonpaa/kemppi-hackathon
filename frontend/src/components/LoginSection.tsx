import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext.tsx";
import { checkTokenValidity } from "../utils/authUtils";

interface Props {
    nimi: string | null;
    role: string | null;
}

const LoginSection: React.FC<Props> = ({ nimi, role }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const { setKayttajatunnus } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            setMessage("Login failed");
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

    return (
        <div>
            {isAuthenticated && nimi !== "" ?
                <>Tervetuloa, {nimi} {role}!
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </> : localStorage.getItem("role") === "visitor" ? 
                <><button onClick={handleClickVisitor}>Login to see more data</button></> : 
                <>
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
                                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', height: '1.75rem', fontSize: 'small' }}
                                    onClick={togglePasswordVisibility}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                                <button>continue as visitor</button>
                            </div>
                        </div>
                        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', width: '100%', marginTop: '1rem' }}>
                            Login
                        </button>
                        <button onClick={handleClickVisitor}>Continue as visitor</button>
                    </form>
                </>}
        </div>


    );
};

export default LoginSection;
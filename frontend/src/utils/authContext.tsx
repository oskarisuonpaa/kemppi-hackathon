import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  role: string | null;
  kayttajatunnus: string | null;
  setKayttajatunnus: React.Dispatch<React.SetStateAction<string | null>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface Props {
    children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialUsername = localStorage.getItem("username");
  const initialToken = localStorage.getItem("authToken");
  const initialRole = localStorage.getItem("role")

  const [kayttajatunnus, setKayttajatunnus] = useState<string | null>(initialUsername);
  const [role, setRole] = useState<string | null>(initialRole);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initialToken);

  useEffect(() => {
    if (initialToken) {
      setIsAuthenticated(true);
      setKayttajatunnus(initialUsername);
      setRole(initialRole)
      console.log("initial" + initialUsername + initialRole)
    }
  }, [initialToken, initialUsername, initialRole]);

  return (
    <AuthContext.Provider value={{ kayttajatunnus, setKayttajatunnus, isAuthenticated, role, setRole }}>{children}</AuthContext.Provider>
  )
};

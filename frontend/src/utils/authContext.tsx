import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  kayttajatunnus: string | null;
  setKayttajatunnus: React.Dispatch<React.SetStateAction<string | null>>;
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

  const [kayttajatunnus, setKayttajatunnus] = useState<string | null>(initialUsername);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initialToken);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (initialToken) {
      setIsAuthenticated(true);
      setKayttajatunnus(initialUsername);
    }
  }, [initialToken, initialUsername]);

  return (
    <AuthContext.Provider value={{ kayttajatunnus, setKayttajatunnus, isAuthenticated }}>{children}</AuthContext.Provider>
  )
};

// src/Contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoggedIn(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5005/api/auth/validate-token", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    validateToken();
  }, [navigate]);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
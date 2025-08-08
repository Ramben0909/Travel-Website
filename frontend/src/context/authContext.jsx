// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        setIsLoggedIn(true);
        const hasLoggedBefore = localStorage.getItem("hasLoggedInBefore");
        if (!hasLoggedBefore) {
          setFirstLogin(true);
          localStorage.setItem("hasLoggedInBefore", "true");
        }
      } else {
        setIsLoggedIn(false);
        setFirstLogin(false);
      }
    }
  }, [isAuthenticated, isLoading, user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        firstLogin,
        setFirstLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

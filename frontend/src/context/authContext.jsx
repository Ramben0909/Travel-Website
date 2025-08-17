/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout, error } = useAuth0();

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, loginWithRedirect, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

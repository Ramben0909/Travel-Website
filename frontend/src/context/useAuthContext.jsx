import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const useAuthContext = () => {
  return useContext(AuthContext);
};

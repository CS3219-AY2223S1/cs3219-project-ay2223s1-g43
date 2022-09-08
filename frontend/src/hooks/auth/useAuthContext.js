import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const useAuthContextProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // TODO: check for refresh token here
  }, [])

  return {
    isLoggedIn, setIsLoggedIn
  };
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(
      "useAuthContext should be called in an useAuthContextProvider"
    );
  }
  return context;
};

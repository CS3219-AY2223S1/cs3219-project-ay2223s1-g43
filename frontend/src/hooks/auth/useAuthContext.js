import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const useAuthContextProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const setLogIn = (username, userId) => {
    setIsLoggedIn(true)
    setUserDetails({ username, userId })
  }

  const setLogOut = () => {
    setIsLoggedIn(false)
    setUserDetails(null)
  }

  return {
    userDetails,
    isLoggedIn,
    setLogIn,
    setLogOut,
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

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const useAuthContextProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const setLogIn = (username) => {
    setIsLoggedIn(true)
    setUsername(username)
  }

  const setLogOut = () => {
    setIsLoggedIn(false)
    setUsername("")
  }

  return {
    username, isLoggedIn, setLogIn, setLogOut,
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

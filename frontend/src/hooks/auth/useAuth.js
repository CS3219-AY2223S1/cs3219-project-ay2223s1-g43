import { useAuthContext } from "./useAuthContext"
import { usersAPI } from "../../api/users";

const useAuth = () => {
  const { setIsLoggedIn } = useAuthContext()
  const signUp = async (username, password) => {
    await usersAPI.handleSignup(username, password);
  };

  const logIn = async (username, password) => {
    const token = await usersAPI.handleLogIn(username, password);
    document.cookie = `access_token=${token}; max-age=10800;`
    setIsLoggedIn(true)
  }

  const logOut = async () => {
    await usersAPI.handleLogOut();
  }

  return { signUp, logIn, logOut }
}

export default useAuth;



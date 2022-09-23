import { useAuthContext } from "./useAuthContext"
import { usersAPI } from "../../api/users";

const refreshTokenKey = "MEETCODE/refreshToken";

const useAuth = () => {
  const { setLogIn, setLogOut } = useAuthContext()
  const signUp = async (username, password) => {
    await usersAPI.handleSignup(username, password);
  };

  const logIn = async (username, password) => {
    const refreshToken = await usersAPI.handleLogIn(username, password);
    setLogIn(username)
    localStorage.setItem(refreshTokenKey, refreshToken)
  }

  const logOut = async () => {
    await usersAPI.handleLogOut();
    localStorage.removeItem(refreshTokenKey)
    setLogOut()
  }

  const deleteAccount = async () => {
    await usersAPI.handleDeleteAccount();
    setLogOut()
  }

  const changePassword = async (oldPassword, newPassword) => {
    await usersAPI.handleChangePassword(oldPassword, newPassword)
  }

  const authenticate = async () => {
    const refreshToken = localStorage.getItem(refreshTokenKey)
    if (refreshToken) {
      const username = await usersAPI.handleAuthenticate(refreshToken)
      if (username) {
        setLogIn(username)
      } else {
        localStorage.removeItem(refreshTokenKey)
      }
    }
  }

  return { signUp, logIn, logOut, deleteAccount, changePassword, authenticate }
}

export default useAuth;



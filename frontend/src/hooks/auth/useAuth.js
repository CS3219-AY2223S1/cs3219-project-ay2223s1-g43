import { useAuthContext } from "./useAuthContext"
import { usersAPI } from "../../api/users";

const useAuth = () => {
  const { setLogIn, setLogOut } = useAuthContext()
  const signUp = async (username, password) => {
    await usersAPI.handleSignup(username, password);
  };

  const logIn = async (username, password) => {
    const token = await usersAPI.handleLogIn(username, password);
    document.cookie = `access_token=${token}; max-age=10800;`
    setLogIn(username)
  }

  const logOut = async () => {
    await usersAPI.handleLogOut();
    setLogOut()
  }

  const deleteAccount = async () => {
    await usersAPI.handleDeleteAccount();
    setLogOut()
  }

  const changePassword = async (oldPassword, newPassword) => {
    await usersAPI.handleChangePassword(oldPassword, newPassword)
  }

  return { signUp, logIn, logOut, deleteAccount, changePassword }
}

export default useAuth;



import createUser from "./createUser";
import deleteUser from "./deleteUser";
import loginUser from "./loginUser";
import changePassword from "./changePassword";
import refreshToken from "./refreshAccessToken";
import logoutUser from "./logoutUser";

const users = {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  changePassword,
  refreshToken,
};

export default users;

import createUser from "./createUser";
import deleteUser from "./deleteUser";
import loginUser from "./loginUser";
import changePassword from "./changePassword";
import refreshToken from "./refeshAccessToken";

const users = {
  createUser,
  deleteUser,
  loginUser,
  changePassword,
  refreshToken,
};

export default users;

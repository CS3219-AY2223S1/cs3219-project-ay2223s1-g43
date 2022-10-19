import { userService } from "./client";
import {
  STATUS_CODE_OKAY,
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "./responses";
import { ResponseException } from "./responses";

const PREFIX_USER_SVC = '/api/user'

export const usersAPI = {
  handleSignup: async (username, password) => {
    try {
      const res = await userService.post(PREFIX_USER_SVC, { username, password });
      if (!(res && res.status === STATUS_CODE_CREATED)) {
        throw new Error()
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        throw new ResponseException('This username already exists')
      } else {
        throw new ResponseException('Please try again later')
      }
    }
  },
  handleLogIn: async (username, password) => {
    try {
      const res = await userService.post(PREFIX_USER_SVC + "/login", { username, password });
      if (res && res.status === STATUS_CODE_OKAY) {
        const { userId, refreshToken } = res.data;
        return { userId, refreshToken };
      } else {
        throw new Error()
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_BAD_REQUEST) {
        throw new ResponseException(err.response.data.message)
      } else {
        throw new ResponseException('Please try again later')
      }
    }
  },
  handleLogOut: async () => {
    try {
      const res = await userService.get(PREFIX_USER_SVC + "/logout");

      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_BAD_REQUEST || err.response.status === STATUS_CODE_FORBIDDEN) {
        throw new ResponseException(err.response.data.message)
      } else {
        throw new ResponseException('Please try again later')
      }
    }
  },
  handleChangePassword: async (oldPassword, newPassword) => {
    try {
      const res = await userService.put(PREFIX_USER_SVC + "/change_password", { oldPassword, newPassword });
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_BAD_REQUEST || err.response.status === STATUS_CODE_FORBIDDEN) {
        throw new ResponseException(err.response.data.message)
      } else {
        throw new ResponseException('Please try again later')
      }
    }
  },
  handleDeleteAccount: async () => {
    try {
      const res = await userService.delete(PREFIX_USER_SVC);
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
        throw new ResponseException(err.response.data.message)
      } else {
        throw new ResponseException('Please try again later')
      }
    }
  },
  handleAuthenticate: async (refreshToken) => {
    try {
      const res = await userService.post(PREFIX_USER_SVC + "/refresh_access_token", {refreshToken});
      const { userId, username } = res.data;
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      return { userId, username };
    } catch (err) {
      return false;
    }
  }
}

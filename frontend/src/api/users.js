import instance from "./client";
import {
  STATUS_CODE_OKAY,
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_FORBIDDEN
} from "./responses";
import { ResponseException } from "./responses";

const PREFIX_USER_SVC = '/api/user'

export const usersAPI = {
  handleSignup: async (username, password) => {
    try {
      const res = await instance.post(PREFIX_USER_SVC, { username, password });
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
      const res = await instance.post(PREFIX_USER_SVC + "/login", { username, password });
      if (res && res.status === STATUS_CODE_OKAY) {
        const { token } = res.data;
        return token;
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
      const res = await instance.get(PREFIX_USER_SVC + "/logout");

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
      const res = await instance.put(PREFIX_USER_SVC + "/change_password", { oldPassword, newPassword });
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
  }
}

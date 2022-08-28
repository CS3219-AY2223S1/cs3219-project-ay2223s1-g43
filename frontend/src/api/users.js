import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import { ResponseException } from "./responses";

export const usersAPI = {
  handleSignup: async (username, password) => {
    try {
      const res = await axios.post(URL_USER_SVC, { username, password });
      if (res && res.status === STATUS_CODE_CREATED) {
        // TODO: refactor
        // Do something
        // setSuccessDialog('Account successfully created')
        // setIsSignupSuccess(true)
      } else {
        throw new Error()
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        throw new ResponseException('This username already exists')
      } else {
        throw new ResponseException('Please try again later')
      }
    }
  }
}

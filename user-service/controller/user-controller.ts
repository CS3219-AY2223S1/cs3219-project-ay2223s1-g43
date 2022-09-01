import { ormCreateUser, ormLoginUser, ormFindUser } from "../model/user-orm";
import { validationResult } from "express-validator";

const CREATION_ERROR = "Could not create a new user!";
const DATABASE_ERROR = "Database failure!";
const INVALID_INPUTS = "Invalid inputs!";
const MISSING_USERNAME_OR_PASSWORD_ERROR =
  "Username and/or Password are missing!";
const USERNAME_TAKEN_ERROR = "Username already taken!";
const WRONG_USERNAME_OR_PASSWORD_ERROR = "Username and/or Password are wrong!";

const CREATE_SUCCESS_MESSAGE = "New user created successfully!";
const LOGIN_SUCCESS_MESSAGE = "Login successfully!";

export async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: INVALID_INPUTS });
  }

  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: MISSING_USERNAME_OR_PASSWORD_ERROR });
    }
    const user = await ormFindUser(username);
    if (user) {
      return res.status(409).json({ message: USERNAME_TAKEN_ERROR });
    }

    const resp = await ormCreateUser(username, password);
    if (!resp) {
      return res.status(201).json({ message: CREATE_SUCCESS_MESSAGE });
    } else {
      console.log(resp);
      return res.status(400).json({ message: CREATION_ERROR });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: DATABASE_ERROR });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: MISSING_USERNAME_OR_PASSWORD_ERROR });
    }
    const user = await ormFindUser(username);
    if (!user) {
      return res
        .status(400)
        .json({ message: WRONG_USERNAME_OR_PASSWORD_ERROR });
    }
    const userToken = await ormLoginUser(user, password);
    console.log(userToken);
    if (!userToken) {
      return res
        .status(400)
        .json({ message: WRONG_USERNAME_OR_PASSWORD_ERROR });
    }
    return res
      .status(200)
      .json({ message: LOGIN_SUCCESS_MESSAGE, token: userToken });
  } catch (err) {
    return res.status(500).json({ message: DATABASE_ERROR });
  }
}

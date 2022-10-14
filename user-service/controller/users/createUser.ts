import { error_msg, success_msg } from "./respondMsg";
import { ormCreateUser, ormFindUser } from "../../model/user-orm";
import { validationResult } from "express-validator";

export default async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: error_msg.PASSWORD_ERROR });
  }

  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: error_msg.MISSING_USERNAME_OR_PASSWORD_ERROR });
    }
    const user = await ormFindUser(username);
    if (user) {
      return res.status(409).json({ message: error_msg.USERNAME_TAKEN_ERROR });
    }

    const resp = await ormCreateUser(username, password);
    if (!resp) {
      return res
        .status(201)
        .json({ message: success_msg.CREATE_SUCCESS_MESSAGE });
    } else {
      return res.status(400).json({ message: error_msg.CREATION_ERROR });
    }
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}

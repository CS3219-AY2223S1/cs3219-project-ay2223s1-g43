import { error_msg, success_msg } from "./respondMsg";
import { ormFindUser, ormLoginUser } from "../../model/user-orm";
import { validationResult } from "express-validator";

export default async function loginUser(req, res) {
  //todo add validation
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: error_msg.MISSING_USERNAME_OR_PASSWORD_ERROR });
    }
    const user = await ormFindUser(username);
    if (!user) {
      return res
        .status(400)
        .json({ message: error_msg.WRONG_USERNAME_OR_PASSWORD_ERROR });
    }
    const userToken = await ormLoginUser(user, password);
    if (!userToken) {
      return res
        .status(400)
        .json({ message: error_msg.WRONG_USERNAME_OR_PASSWORD_ERROR });
    }
    return res
      .cookie("access_token", userToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: success_msg.LOGIN_SUCCESS_MESSAGE, token: userToken });
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}

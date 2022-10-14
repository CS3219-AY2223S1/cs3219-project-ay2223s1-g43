import { error_msg, success_msg } from "./respondMsg";
import {
  ormFindUser,
  ormLoginUser,
  ormUpdateSession,
} from "../../model/user-orm";

export default async function loginUser(req, res) {
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
    const tokens = await ormLoginUser(user, password);
    if (!tokens) {
      return res
        .status(400)
        .json({ message: error_msg.WRONG_USERNAME_OR_PASSWORD_ERROR });
    }
    await ormUpdateSession(user.username, tokens.session);
    return res
      .cookie("access_token", tokens.accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: success_msg.LOGIN_SUCCESS_MESSAGE,
        username: tokens.username,
        refreshToken: tokens.refreshToken,
      });
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}

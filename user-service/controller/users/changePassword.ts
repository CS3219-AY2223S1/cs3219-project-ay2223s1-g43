import { error_msg, success_msg } from "./respondMsg";
import {
  ormFindUser,
  ormLoginUser,
  ormUpdatePassword,
} from "../../model/user-orm";

export default async function changePassword(req, res) {
  //todo add validation
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: error_msg.MISSING_FIELDS_ERROR });
    }
    const username = req.username;
    const user = await ormFindUser(username);
    if (!user) {
      return res.status(400).json({ message: error_msg.INVALID_USER_ERROR });
    }
    const userToken = await ormLoginUser(user, oldPassword);
    if (!userToken) {
      return res.status(400).json({ message: error_msg.WRONG_PASSWORD_ERROR });
    }
    const updatedUser = await ormUpdatePassword(username, newPassword);
    if (!updatedUser) {
      return res.status(500).json({ message: error_msg.DATABASE_ERROR });
    }
    return res
      .status(200)
      .json({ message: success_msg.PASSWORD_UPDATED_SUCCESS_MESSAGE });
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}

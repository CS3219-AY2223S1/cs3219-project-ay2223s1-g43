import { error_msg, success_msg } from "./respondMsg";
import { ormDeleteUser } from "../../model/user-orm";

export default async function deleteUser(req, res) {
  try {
    const username = req.username;
    const deletedUser = await ormDeleteUser(username);
    if (!deletedUser) {
      return res.status(500).json({ message: error_msg.DATABASE_ERROR });
    }
    console.log(deletedUser);
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: success_msg.DELETE_SUCCESS_MESSAGE });
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}

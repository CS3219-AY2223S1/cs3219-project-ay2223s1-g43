import { ormFindUser, ormUpdateSession } from "../../model/user-orm";
import { error_msg } from "./respondMsg";

export default async function logoutUser(req, res) {
  try {
    const username = req.username;
    const user = await ormFindUser(username);
    if (!user) {
      return res.status(500).json({ message: error_msg.DATABASE_ERROR });
    }
    await ormUpdateSession(user.username, "");
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logged out successfully!" });
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}

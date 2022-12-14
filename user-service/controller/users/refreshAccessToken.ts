import { error_msg } from "./respondMsg";
import { ormRefreshAccessToken } from "../../model/user-orm";

export default async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: error_msg.MISSING_TOKENS_ERROR });
    }
    const tokens = await ormRefreshAccessToken(refreshToken);
    if (!tokens) {
      return res.status(400).json({ message: error_msg.INVALID_TOKEN_ERROR });
    }
    return res
      .cookie("access_token", tokens.accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        username: tokens.username,
        userId: tokens.userId,
      });
  } catch (err) {
    return res.status(400).json({ message: error_msg.INVALID_TOKEN_ERROR });
  }
}

import { error_msg } from "./respondMsg";
import { ormFindUserById } from "../../model/user-orm";
import { validationResult } from "express-validator";

export default async function validateUserId(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: error_msg.INVALID_USER_ID_ERROR });
  }

  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res
        .status(400)
        .json({ message: error_msg.MISSING_FIELDS_ERROR });
    }
    const user = await ormFindUserById(user_id);
    if (!user) {
      return res
        .status(400)
        .json({ message: error_msg.INVALID_USER_ERROR });
    }

    return res
      .sendStatus(200);
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}

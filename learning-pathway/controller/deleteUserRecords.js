import { error_msg, generateValidationError } from "./respondMsg.js";
import { ormDeleteUserRecords } from "../model/record-orm.js";
import { validationResult } from "express-validator";

export default async function deleteUserRecords(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: generateValidationError(errors.errors) });
  }

  try {
    const { userId } = req.params;

    const resp = await ormDeleteUserRecords(userId);

    if (!resp) {
      return res.status(200).end();
    } else {
      return res.status(400).json({ message: error_msg.DELETE_ERROR });
    }
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}


import { error_msg, generateValidationError } from "./respondMsg.js";
import { ormGetUserRecords } from "../model/record-orm.js";
import { validationResult } from "express-validator";

export default async function getUserRecords(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: generateValidationError(errors.errors) });
  }

  try {
    const { userId } = req.params;

    const records = await ormGetUserRecords(userId);

    if (records) {
      return res
        .status(200)
        .json({ records });
    } else {
      return res.status(400).json({ message: error_msg.READ_ERROR });
    }
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}


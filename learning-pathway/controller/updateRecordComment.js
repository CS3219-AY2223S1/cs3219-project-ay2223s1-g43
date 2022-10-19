import { error_msg, success_msg, generateValidationError } from "./respondMsg.js";
import { ormUpdateRecordComment } from "../model/record-orm.js";
import { validationResult } from "express-validator";

export default async function updateRecordComment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: generateValidationError(errors.errors) });
  }

  try {
    const { id, comment } = req.body;

    // TODO: validate that record exists

    const resp = await ormUpdateRecordComment(id, comment);

    if (!resp) {
      return res
        .status(200)
        .json({ message: success_msg.UPDATE_SUCCESS_MESSAGE });
    } else {
      return res.status(400).json({ message: error_msg.ADD_COMMENT_ERROR });
    }
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}


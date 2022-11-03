import { error_msg, success_msg, generateValidationError } from "./respondMsg.js";
import { ormCreateRecord } from "../model/record-orm.js";
import { validationResult } from "express-validator";

export default async function createRecord(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: generateValidationError(errors.errors) });
  }

  try {
    const { user_id, partner_username, question_difficulty, question_id,
      question_title, code, code_language, timestamp } = req.body;

    const resp = await ormCreateRecord(user_id, partner_username, question_difficulty,
      question_id, question_title, code, code_language, timestamp);

    if (resp === null) {
      return res
        .status(201)
        .json({ message: success_msg.CREATE_SUCCESS_MESSAGE });
    } else {
      return res.status(400).json({ message: error_msg.CREATION_ERROR });
    }
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}


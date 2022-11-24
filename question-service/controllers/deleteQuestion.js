import { error_msg, success_msg, generateValidationError } from "./respondMsg.js";
import { validationResult } from "express-validator";
import { ormDeleteEasyQuestion, ormDeleteMediumQuestion, ormDeleteHardQuestion } from "../models/question-orm.js";
import DIFFICULTIES from "../models/difficulties.js";

export default async function deleteQuestion(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(generateValidationError(errors.errors));
  }

  try {
    const { difficulty, id } = req.params;

    const resp = difficulty === DIFFICULTIES.EASY
      ? await ormDeleteEasyQuestion(id)
      : difficulty === DIFFICULTIES.MEDIUM
        ? await ormDeleteMediumQuestion(id)
        : await ormDeleteHardQuestion(id)
    
    if (resp) {
      return res
        .status(200)
        .json({ message: success_msg.DELETE_SUCCESS_MESSAGE });
    } else {
      return res.status(400).json({ message: error_msg.DELETION_ERROR });
    }
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}


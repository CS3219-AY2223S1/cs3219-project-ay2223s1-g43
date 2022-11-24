import { error_msg, success_msg, generateValidationError } from "./respondMsg.js";
import { validationResult } from "express-validator";
import { ormCreateEasyQuestion, ormCreateMediumQuestion, ormCreateHardQuestion } from "../models/question-orm.js";
import DIFFICULTIES from "../models/difficulties.js";

export default async function createQuestion(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(generateValidationError(errors.errors));
  }

  try {
    const { difficulty } = req.params;
    const { id, title, body } = req.body;
    const resp = difficulty === DIFFICULTIES.EASY
      ? await ormCreateEasyQuestion(id, title, body)
      : difficulty === DIFFICULTIES.MEDIUM
        ? await ormCreateMediumQuestion(id, title, body)
        : await ormCreateHardQuestion(id, title, body)

    if (!resp) {
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


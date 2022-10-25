import { error_msg, generateValidationError } from "./respondMsg.js";
import { validationResult } from "express-validator";
import DIFFICULTIES from "../models/difficulties.js";
import { ormGetEasyQuestionById, ormGetHardQuestionById, ormGetMediumQuestionById } from "../models/question-orm.js";

export default async function getQuestion(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(generateValidationError(errors.errors));
  }
  try {
    const { difficulty, id } = req.params;
    let question

    switch (difficulty) {
      case DIFFICULTIES.EASY:
        question = await ormGetEasyQuestionById(id)
        break;
      case DIFFICULTIES.MEDIUM:
        question = await ormGetMediumQuestionById(id)
        break;
      case DIFFICULTIES.HARD:
        question = await ormGetHardQuestionById(id)
        break;
    }

    if (question) {
      return res.status(200).json(question)
    } else {
      return res.status(400).json({ message: error_msg.READ_ERROR });
    }
  } catch (err) {
    return res.status(500).json({ message: error_msg.DATABASE_ERROR });
  }
}


import { error_msg, generateValidationError } from "./respondMsg.js";
import { validationResult } from "express-validator";
import DIFFICULTIES from "../models/difficulties.js";
import seedrandom from "seedrandom";
import { ormGetRandomEasyQuestion, ormGetRandomMediumQuestion, ormGetRandomHardQuestion } from "../models/question-orm.js";

export default async function getRandomQuestion(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(generateValidationError(errors.errors));
  }
  try {
    const { difficulty, uuid } = req.params;
    const rng = seedrandom(uuid)();
    let question

    switch (difficulty) {
      case DIFFICULTIES.EASY:
        question = await ormGetRandomEasyQuestion(rng)
        break;
      case DIFFICULTIES.MEDIUM:
        question = await ormGetRandomMediumQuestion(rng)
        break;
      case DIFFICULTIES.HARD:
        question = await ormGetRandomHardQuestion(rng)
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


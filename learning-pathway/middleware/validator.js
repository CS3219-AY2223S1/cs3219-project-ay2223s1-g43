import { check } from "express-validator";
import { DIFFICULTIES, LANGUAGES } from "../model/constants.js";

export const createRecordValidator = [
  check('user_id').notEmpty().isMongoId(),
  check('partner_username').notEmpty(),
  check('question_difficulty').custom(value => {
    if (value === DIFFICULTIES.EASY || value === DIFFICULTIES.MEDIUM || value === DIFFICULTIES.HARD) {
      return true;
    }
    throw new Error('Difficulty must be either \"EASY\", \"MEDIUM\", or \"DIFFICULT\"');
  }),
  check('question_id').notEmpty().isNumeric(),
  check('question_title').notEmpty(),
  check('code').exists(),
  check('code_language').custom(value => {
    if (value === LANGUAGES.JAVA || value === LANGUAGES.JAVASCRIPT || value === LANGUAGES.PYTHON) {
      return true;
    }
    throw new Error('Code language must be either \"JAVA\", \"JAVASCRIPT\", or \"PYTHON\"');
  }),
  check('timestamp').notEmpty().isISO8601().toDate(),
]

export const userIdValidator = [
  check('userId').notEmpty().isMongoId(),
]

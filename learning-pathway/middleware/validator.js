import { check } from "express-validator";
import { DIFFICULTIES, LANGUAGES } from "../model/constants.js";
import validateQuestionId from "./validateQuestionId.js";
import validateUserId from "./validateUserId.js";

export const createRecordValidator = [
  check('user_id').notEmpty().isMongoId().custom(async value => {
    const isUserIdValid = await validateUserId(value)
    if (isUserIdValid) {
      return true
    }
    throw new Error('Invalid User ID');
  }),
  check('partner_username').notEmpty(),
  check('question_difficulty').custom(value => {
    if (value === DIFFICULTIES.EASY || value === DIFFICULTIES.MEDIUM || value === DIFFICULTIES.HARD) {
      return true;
    }
    throw new Error('Difficulty must be either \"EASY\", \"MEDIUM\", or \"DIFFICULT\"');
  }),
  check('question_id').notEmpty().isNumeric().custom(async (value, {req}) => {
    const questionTitle = await validateQuestionId(req.body.question_difficulty, value, req)
    if (questionTitle) {
      req.body.question_title = questionTitle;
      return true
    }
    throw new Error('Invalid Question ID');
  }),
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

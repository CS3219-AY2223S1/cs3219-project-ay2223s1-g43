import { check } from "express-validator";
import DIFFICULTIES from "../model/difficulties.js";

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
  check('timestamp').notEmpty().isISO8601().toDate(),
]

export const addCommentValidator = [
  check('id').notEmpty().isMongoId(),
  check('comment').notEmpty()
]

export const userIdValidator = [
  check('userId').notEmpty().isMongoId(),
]

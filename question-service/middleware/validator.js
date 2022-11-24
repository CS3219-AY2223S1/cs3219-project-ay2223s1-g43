// import { check } from "express-validator";
import DIFFICULTIES from "../models/difficulties.js";
import { validateNotEmpty, validateNumeric, validateUuid } from "./commonValidators.js";

const difficultyValidator = validateNotEmpty('difficulty').custom(value => {
  if (value === DIFFICULTIES.EASY || value === DIFFICULTIES.MEDIUM || value === DIFFICULTIES.HARD) {
    return true;
  }
  throw new Error(`Must be either "${DIFFICULTIES.EASY}", "${DIFFICULTIES.MEDIUM}", or "${DIFFICULTIES.HARD}"`);
})

export const createQuestionValidator = [
  difficultyValidator,
  validateNotEmpty("id"),
  validateNumeric("id"),
  validateNotEmpty("title"),
  validateNotEmpty("body"),
]

export const getRandomQuestionValidator = [
  difficultyValidator,
  validateNotEmpty("uuid"),
  validateUuid("uuid")
]

export const getQuestionValidator = [
  difficultyValidator,
  validateNotEmpty("id"),
  validateNumeric("id"),
]

export const deleteQuestionValidator = [
  difficultyValidator,
  validateNotEmpty("id"),
  validateNumeric("id"),
]
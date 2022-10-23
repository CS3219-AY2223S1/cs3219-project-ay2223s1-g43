import VALIDATION_ERROR_MESSAGES from "./errorMsg.js"
import { check } from "express-validator";

export const validateNotEmpty = (field) => check(field).notEmpty().withMessage(VALIDATION_ERROR_MESSAGES.NOT_EMPTY)
export const validateNumeric = (field) => check(field).isNumeric().withMessage(VALIDATION_ERROR_MESSAGES.NUMERIC)
export const validateUuid = (field) => check(field).isUUID(4).withMessage(VALIDATION_ERROR_MESSAGES.UUID)

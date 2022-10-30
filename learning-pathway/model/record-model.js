import mongoose, { model, Types, Schema } from "mongoose";
import { DIFFICULTIES, LANGUAGES } from "../model/constants.js";

// Workaround to ensure empty strings are allowed
mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

const recordSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    required: true,
  },
  partner_username: {
    type: String,
    required: true,
  },
  question_difficulty: {
    type: String,
    enum: [DIFFICULTIES.EASY, DIFFICULTIES.MEDIUM, DIFFICULTIES.HARD],
    required: true,
  },
  question_id: {
    type: Number,
    required: true,
  },
  question_title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  code_language: {
    type: String,
    enum: [LANGUAGES.JAVA, LANGUAGES.JAVASCRIPT, LANGUAGES.PYTHON],
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export default model("RecordModel", recordSchema);

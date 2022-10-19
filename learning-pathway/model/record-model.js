import { model, Types, Schema } from "mongoose";
import DIFFICULTIES from "./difficulties.js";

// user ID of the user [x]
// username of partner [x]
// question difficulty [x]
// question ID  [x]
// question title [x]
// code written [x]
// the user’s comments [x]
// datetime when the attempt was started [x]

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
  timestamp: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
  },
});

export default model("RecordModel", recordSchema);

import mongoose from "mongoose";
import recordModel from "./record-model.js";
import "dotenv/config";

const mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : 'mongodb://localhost:27017/test';

mongoose.connect(`${mongoDB}`, { autoIndex: false });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export function createRecord(user_id, partner_username, question_difficulty,
  question_id, question_title, code, code_language, timestamp) {
  return new recordModel({
    user_id,
    partner_username,
    question_difficulty,
    question_id,
    question_title,
    code,
    code_language,
    timestamp,
  });
}

export async function getUserRecords(user_id) {
  const records = await recordModel
    .find({ user_id })
    .sort({ timestamp: 'descending' })
    .exec();
  return records;
}

export async function deleteUserRecords(user_id) {
  await recordModel
    .deleteMany({ user_id: user_id })
    .exec();
}

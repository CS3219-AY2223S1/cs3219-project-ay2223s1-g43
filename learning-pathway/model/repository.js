import mongoose from "mongoose";
import recordModel from "./record-model.js";
import "dotenv/config";

const mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(`${mongoDB}`, { autoIndex: false });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export function createRecord(user_id, partner_username, question_difficulty,
  question_id, question_title, code, timestamp) {
  return new recordModel({
    user_id,
    partner_username,
    question_difficulty,
    question_id,
    question_title,
    code,
    timestamp,
    comment: ""
  });
}

export async function updateRecordComment(id, comment) {
  const record = await recordModel
    .findOneAndUpdate(
      { _id: id },
      { comment },
      { new: true }
    )
    .exec();
  return record;
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

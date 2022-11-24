import { createRecord, deleteUserRecords, getUserRecords } from "./repository.js";

export async function ormCreateRecord(user_id, partner_username, question_difficulty,
  question_id, question_title, code, code_language, timestamp) {
  try {
    const newRecord = createRecord(user_id, partner_username, question_difficulty,
      question_id, question_title, code, code_language, timestamp);
    await newRecord.save();
    return null;
  } catch (err) {
    return { err };
  }
}

export async function ormGetUserRecords(user_id) {
  const records = await getUserRecords(user_id);
  return records;
}

export async function ormDeleteUserRecords(user_id) {
  await deleteUserRecords(user_id);
}
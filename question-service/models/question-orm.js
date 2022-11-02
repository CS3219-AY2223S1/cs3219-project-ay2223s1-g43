import {
  createEasyQuestion,
  createMediumQuestion,
  createHardQuestion,
  getRandomEasyQuestion,
  getRandomMediumQuestion,
  getRandomHardQuestion,
  getEasyQuestionById,
  getMediumQuestionById,
  getHardQuestionById,
  deleteEasyQuestion,
  deleteMediumQuestion,
  deleteHardQuestion,
} from "./repository.js";

export async function ormCreateEasyQuestion(id, title, body) {
  try {
    const newRecord = createEasyQuestion(id, title, body);
    await newRecord.save();
    return null;
  } catch (err) {
    return { err };
  }
}

export async function ormCreateMediumQuestion(id, title, body) {
  try {
    const newRecord = createMediumQuestion(id, title, body);
    await newRecord.save();
    return null;
  } catch (err) {
    return { err };
  }
}

export async function ormCreateHardQuestion(id, title, body) {
  try {
    const newRecord = createHardQuestion(id, title, body);
    await newRecord.save();
    return null;
  } catch (err) {
    return { err };
  }
}

export async function ormDeleteEasyQuestion(id) {
  const deletedQuestion = await deleteEasyQuestion(id);
  return deletedQuestion
}

export async function ormDeleteMediumQuestion(id) {
  const deletedQuestion = await deleteMediumQuestion(id);
  return deletedQuestion
}

export async function ormDeleteHardQuestion(id) {
  const deletedQuestion = await deleteHardQuestion(id);
  return deletedQuestion
}

export async function ormGetRandomEasyQuestion(randomNumber) {
  const question = await getRandomEasyQuestion(randomNumber);
  return question
}

export async function ormGetRandomMediumQuestion(randomNumber) {
  const question = await getRandomMediumQuestion(randomNumber);
  return question
}

export async function ormGetRandomHardQuestion(randomNumber) {
  const question = await getRandomHardQuestion(randomNumber);
  return question
}

export async function ormGetEasyQuestionById(id) {
  const question = await getEasyQuestionById(id);
  return question
}

export async function ormGetMediumQuestionById(id) {
  const question = await getMediumQuestionById(id);
  return question
}

export async function ormGetHardQuestionById(id) {
  const question = await getHardQuestionById(id);
  return question
}


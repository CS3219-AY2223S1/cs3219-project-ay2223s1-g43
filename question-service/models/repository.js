import mongoose from 'mongoose';
import EasyQuestion from './easyQuestion.model.js';
import HardQuestion from './hardQuestion.model.js';
import MediumQuestion from './mediumQuestion.model.js';
import "dotenv/config";

const uri = process.env.ENV == "PROD"
  ? process.env.DB_CLOUD_URI
  : process.env.DB_LOCAL_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})

export function createEasyQuestion(id, title, body) {
  const newQuestion = new EasyQuestion({ id, title, body });
  return newQuestion;
}

export function createMediumQuestion(id, title, body) {
  const newQuestion = new MediumQuestion({ id, title, body });
  return newQuestion;
}

export function createHardQuestion(id, title, body) {
  const newQuestion = new HardQuestion({ id, title, body });
  return newQuestion;
}

export async function getRandomEasyQuestion(randomNumber) {
  const questions = await EasyQuestion.find()
  return questions[Math.floor(randomNumber * questions.length)]
}

export async function getRandomMediumQuestion(randomNumber) {
  const questions = await MediumQuestion.find()
  return questions[Math.floor(randomNumber * questions.length)]
}

export async function getRandomHardQuestion(randomNumber) {
  const questions = await HardQuestion.find()
  return questions[Math.floor(randomNumber * questions.length)]
}

export async function getEasyQuestionById(id) {
  const question = await EasyQuestion.findOne({ id }).exec()
  return question;
}

export async function getMediumQuestionById(id) {
  const question = await MediumQuestion.findOne({ id }).exec()
  return question;
}

export async function getHardQuestionById(id) {
  const question = await HardQuestion.findOne({ id }).exec()
  return question;
}

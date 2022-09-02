import mongoose from "mongoose";
import UserModel from "./user-model";
import "dotenv/config";

//Set up mongoose connection

const mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(`${mongoDB}`, { autoIndex: false });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export function createUser(username: string, pHash: string) {
  return new UserModel({
    username: username,
    pHash: pHash,
  });
}

export async function findUser(username: string) {
  const user = await UserModel.findOne({ username: username }).exec();
  return user;
}

import mongoose from "mongoose";
import UserModel from "./user-model";
import "dotenv/config";
import userModel from "./user-model";

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

export async function updatePassword(username: string, newPHash: string) {
  const user = await userModel
    .findOneAndUpdate(
      { username: username },
      { pHash: newPHash },
      {
        new: true,
      }
    )
    .exec();
  return user;
}

export async function deleteUser(username: string) {
  const user = await userModel.findOneAndDelete({ username: username }).exec();
  return user;
}

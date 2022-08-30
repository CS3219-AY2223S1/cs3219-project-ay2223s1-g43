import { Schema, model } from "mongoose";

export interface User {
  username: string;
  pHash: string;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  pHash: {
    type: String,
    required: true,
  },
});

export default model<User>("UserModel", userSchema);

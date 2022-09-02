import { Document, model, Schema } from "mongoose";

export interface UserData extends Document {
  username: string;
  pHash: string;
}

const userSchema = new Schema<UserData>({
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

export default model<UserData>("UserModel", userSchema);

import jsonwebtoken from "jsonwebtoken";
import { UserData } from "./user-model";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY || "test";

interface TokenPayload {
  username: string;
}

export function createUserToken(user: UserData) {
  const token = jsonwebtoken.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "12h",
  });
  return token;
}

export function checkToken(token: string) {
  console.log(token);
  const data = jsonwebtoken.verify(token, SECRET_KEY) as TokenPayload;
  return data;
}

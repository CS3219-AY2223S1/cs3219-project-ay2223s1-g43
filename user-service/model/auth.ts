import jsonwebtoken from "jsonwebtoken";
import { UserData } from "./user-model";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY || "test";

interface TokenPayload {
  username: string;
  session: string;
}

export function createAccessToken(user: UserData) {
  const token = jsonwebtoken.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "2h",
  });
  return token;
}

export function createRefreshToken(user: UserData, session: string) {
  const token = jsonwebtoken.sign(
    { username: user.username, session: session },
    SECRET_KEY,
    {
      expiresIn: "12h",
    }
  );
  return token;
}

export function checkToken(token: string) {
  const data = jsonwebtoken.verify(token, SECRET_KEY) as TokenPayload;
  return data;
}

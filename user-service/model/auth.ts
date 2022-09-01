import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

export function createUserToken(user) {
  const token = jsonwebtoken.sign({ username: user.username }, SECRET_KEY!, {
    expiresIn: "12h",
  });
  return token;
}

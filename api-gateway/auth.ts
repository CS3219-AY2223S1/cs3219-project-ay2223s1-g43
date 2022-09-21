import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY || "test";

interface TokenPayload {
  username: string;
}

export function authorization(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const data = jsonwebtoken.verify(token, SECRET_KEY)  as TokenPayload;;
    req.username = data.username;
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
}

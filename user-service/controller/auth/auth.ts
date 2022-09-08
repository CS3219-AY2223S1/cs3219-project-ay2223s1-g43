import { checkToken } from "../../model/auth";

export function authorization(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const data = checkToken(token);
    req.username = data.username;
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
}

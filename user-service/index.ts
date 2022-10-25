import auth from "./controller/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import users from "./controller/users";
import { body } from "express-validator";

const ORIGIN_URL = process.env.ORIGIN_URL || "localhost:3000";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [new RegExp("http://" + ORIGIN_URL + "*"), new RegExp("https://" + ORIGIN_URL + "*")]
  })
);

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get("/", (_, res) => {
  res.send("Hello World from user-service");
});
router.post("/", 
  body("password").trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0}), 
  users.createUser
);
router.delete("/", auth.authorization, users.deleteUser);
router.post("/refresh_access_token", users.refreshToken);
router.post("/login", users.loginUser);
router.get("/logout", auth.authorization, users.logoutUser);
router.put("/change_password", 
  auth.authorization, 
  body("newPassword").trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0}), 
  users.changePassword
);

app.use("/api/user", router);
app.use("/api/user", (_, res) => {
  res.setHeader("content-type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(8000, () => console.log("user-service listening on port 8000"));

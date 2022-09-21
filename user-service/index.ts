import express from "express";
import users from "./controller/users";
import { body } from "express-validator";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get("/", (_, res) => {
  res.send("Hello World from user-service");
});

router.post("/", body("password").isLength({ min: 5 }), users.createUser);
router.delete("/", users.deleteUser);
router.post("/login", users.loginUser);
router.get("/logout", (_, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out successfully!" });
});
router.put("/change_password", users.changePassword);
router.all("*", (_, res) => {
  return res.status(401).json({ message: "Data not found!"});
});

app.use("/api/user", router);
app.use("/api/user", (_, res) => {
  res.setHeader("content-type", "application/json");
});

app.listen(8000, () => console.log("user-service listening on port 8000"));

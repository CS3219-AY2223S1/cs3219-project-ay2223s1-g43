import cors from "cors";
import express from "express";
import { createUser, loginUser } from "./controller/user-controller";
import { body } from "express-validator";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get("/", (_, res) => res.send("Hello World from user-service"));
router.post("/", body("password").isLength({ min: 5 }), createUser);
router.post("/login", loginUser);

app.use("/api/user", router);
app.use("/api/user", (_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(8000, () => console.log("user-service listening on port 8000"));

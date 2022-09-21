import express from "express";
import { authorization } from "./auth";

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get("/", (_, res) => {
  res.send("Hello World from user-service");
});

router.post("/");
router.post("/login");
router.delete("/", authorization);
router.get("/logout", authorization);
router.put("/change_password", authorization);

export default router;

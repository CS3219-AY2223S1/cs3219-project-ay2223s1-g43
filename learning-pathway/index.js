import cors from "cors";
import express from "express";
import createRecord from "./controller/createRecord.js";
import deleteUserRecords from "./controller/deleteUserRecords.js";
import getUserRecords from "./controller/getUserRecords.js";
import { createRecordValidator, userIdValidator } from "./middleware/validator.js";

const ORIGIN_URL = process.env.ORIGIN_URL || "localhost:3000/";
const PORT = process.env.PORT || 8002;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [new RegExp("http://" + ORIGIN_URL + "*"), new RegExp("https://" + ORIGIN_URL + "*")]
  })
);

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello World from learning-pathway");
});

router.get("/:userId",
  userIdValidator,
  getUserRecords
);

router.post("/",
  createRecordValidator,
  createRecord
);

router.delete("/:userId",
  userIdValidator,
  deleteUserRecords
);

app.use("/api/record", router);

app.listen(PORT, () => console.log(`learning-pathway listening on port ${PORT}`));

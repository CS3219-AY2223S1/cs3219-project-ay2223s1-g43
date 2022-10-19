import cors from "cors";
import express from "express";
import createRecord from "./controller/createRecord.js";
import deleteUserRecords from "./controller/deleteUserRecords.js";
import getUserRecords from "./controller/getUserRecords.js";
import { addCommentValidator, createRecordValidator, userIdValidator } from "./middleware/validator.js";
import { updateRecordComment } from "./model/repository.js";

const ORIGIN_URL = process.env.ORIGIN_URL || "http://localhost:3000/";
const PORT = process.env.PORT || 8002;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    // TODO: fix this to rely on ORIGIN_URL
    origin: /http:\/\/localhost:3000\/*/,
  })
);

const router = express.Router();

router.get("/:userId",
  userIdValidator,
  getUserRecords
);

router.post("/",
  createRecordValidator,
  createRecord
);

router.patch("/:id",
  addCommentValidator,
  updateRecordComment
);

router.delete("/:userId",
  userIdValidator,
  deleteUserRecords
);

app.use("/api/record", router);

app.get("/api", (_, res) => {
  res.send("Hello World from learning-pathway");
});

app.listen(PORT, () => console.log(`learning-pathway listening on port ${PORT}`));

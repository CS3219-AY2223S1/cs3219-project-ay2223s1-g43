import cors from "cors";
import express from "express";
import QuestionRouter from "./routes/question.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());

app.use('/api/question', QuestionRouter)

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})
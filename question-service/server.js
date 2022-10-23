import cors from "cors";
import express from "express";
import QuestionRouter from "./routes/question.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/question', QuestionRouter)

app.get('/api', (_, res) => {
    res.send("Hello World from question service");
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})
import cors from "cors";
import express from "express";
import QuestionRouter from "./routes/question.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8003;
const ORIGIN_URL = process.env.ORIGIN_URL || "localhost:3000";


app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: [new RegExp("http://" + ORIGIN_URL + "*"), new RegExp("https://" + ORIGIN_URL + "*")]
    })
);

app.use('/api/question', QuestionRouter)

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})

export default app;
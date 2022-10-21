import express from "express";
import { createQuestionValidator, getQuestionValidator, getRandomQuestionValidator } from "../middleware/validator.js";
import getRandomQuestion from "../controllers/getRandomQuestion.js";
import createQuestion from "../controllers/createQuestion.js";
import getQuestion from "../controllers/getQuestion.js";

const QuestionRouter = express.Router();

QuestionRouter.get("/:difficulty/:id",
    getQuestionValidator,
    getQuestion,
);

QuestionRouter.get("/random/:difficulty/:uuid",
    getRandomQuestionValidator,
    getRandomQuestion,
);

QuestionRouter.post("/:difficulty",
    createQuestionValidator,
    createQuestion,
);

export default QuestionRouter
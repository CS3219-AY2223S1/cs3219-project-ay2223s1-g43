import express from "express";
import { createQuestionValidator, getQuestionValidator, getRandomQuestionValidator, deleteQuestionValidator } from "../middleware/validator.js";
import getRandomQuestion from "../controllers/getRandomQuestion.js";
import createQuestion from "../controllers/createQuestion.js";
import getQuestion from "../controllers/getQuestion.js";
import deleteQuestion from "../controllers/deleteQuestion.js";
import validateQuestion from "../controllers/validateQuestion.js";

const QuestionRouter = express.Router();

QuestionRouter.get("/", (_, res) => {
    res.send("Hello from question service");
});

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

QuestionRouter.delete("/:difficulty/:id",
    deleteQuestionValidator,
    deleteQuestion,
);

QuestionRouter.post("/validate/:difficulty/:id",
    getQuestionValidator,
    validateQuestion,
);

export default QuestionRouter
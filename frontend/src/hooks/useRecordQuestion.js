import { useState } from "react"
import { questionsAPI } from "../api/questions"

const useRecordQuestion = () => {
  const [question, setQuestion] = useState(null)

  const getQuestion = async (questionDifficulty, id) => {
    if (question === null) {
      const qn = await questionsAPI.handleGetQuestion(questionDifficulty.toLowerCase(), id)
      setQuestion(qn)
    }
  }

  return { question, getQuestion }
}

export default useRecordQuestion;
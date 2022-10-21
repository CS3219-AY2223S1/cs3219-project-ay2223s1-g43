import { useEffect } from "react";
import useRecordQuestion from "../../../../hooks/useRecordQuestion";
import QuestionDisplay from "../../../components/QuestionDisplay";

const RecordRowQuestion = (props) => {
  const { questionId, questionDifficulty } = props
  const { question, getQuestion } = useRecordQuestion();

  useEffect(() => {
    getQuestion(questionDifficulty, questionId)
  }, [])

  return (
    <QuestionDisplay question={question} />
  )
}

export default RecordRowQuestion;
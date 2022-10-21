import { questionsAPI } from "../api/questions";
import { useLocation } from 'react-router-dom';

const useQuestion = () => {
  const location = useLocation();
  const roomId = location.state.room
  const difficulty = location.state.difficulty

  const getQuestion = async () => {
    // TODO: consider asserting (difficulty === "easy" || difficulty === "medium" || difficulty === "hard")
    return await questionsAPI.handleGetRandomQuestion(difficulty, roomId)
  };

  return { getQuestion }
}

export default useQuestion;
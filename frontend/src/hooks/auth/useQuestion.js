import { questionsAPI } from "../../api/questions";
import { useLocation } from 'react-router-dom';

const useQuestion = () => {
  const location = useLocation();
  const roomId = location.state.room
  const difficulty = location.state.difficulty

  const getQuestion = async () => {
    if (difficulty === "easy") {
      return await questionsAPI.handleGetEasy(roomId);

    } else if (difficulty === "medium") {
      return await questionsAPI.handleGetMedium(roomId);

    } else if (difficulty === "hard") {
      return await questionsAPI.handleGetHard(roomId);
    }
  };

  return { getQuestion }
}

export default useQuestion;
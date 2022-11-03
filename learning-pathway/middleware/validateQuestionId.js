import { questionService } from "./validationClient.js";

const validateQuestionId = async (difficulty, question_id) => {
  try {
    const res = await questionService.post(`/api/question/validate/${difficulty.toLowerCase()}/${question_id}`);
    if (res && res.status === 200) {
      const { title } = res.data;
      return title
    }
    return false
  } catch (err) {
    return false
  }
}

export default validateQuestionId;

import { questionService } from "./client";
import { STATUS_CODE_OKAY } from "./responses";
import { ResponseException } from "./responses";

const PREFIX_QUESTION_SVC = '/api/question'

export const questionsAPI = {
  handleGetRandomQuestion: async (difficulty, roomId) => {
    try {
      const res = await questionService.get(PREFIX_QUESTION_SVC + `/random/${difficulty}/${roomId}`);
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      const { id, title, body } = res.data;
      return { id, title, body }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
  handleGetRandomEasy: async (roomId) => {
    try {
      const res = await questionService.get(PREFIX_QUESTION_SVC + `/random/easy/${roomId}`);
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      const { id, title, body } = res.data;
      return { id, title, body }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
  handleGetRandomMedium: async (roomId) => {
    try {
      const res = await questionService.get(PREFIX_QUESTION_SVC + `/random/medium/${roomId}`);
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      const { id, title, body } = res.data;
      return { id, title, body }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
  handleGetRandomHard: async (roomId) => {
    try {
      const res = await questionService.get(PREFIX_QUESTION_SVC + `/random/hard/${roomId}`);
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      const { id, title, body } = res.data;
      return { id, title, body }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  }
}

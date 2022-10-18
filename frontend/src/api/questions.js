import { questionService } from "./client";
import { STATUS_CODE_OKAY } from "./responses";
import { ResponseException } from "./responses";

const PREFIX_QUESTION_SVC = '/question'

export const questionsAPI = {
  handleGetEasy: async (roomId) => {
    try {
      const res = await questionService.post(PREFIX_QUESTION_SVC + "/getEasy", { id: roomId });
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      const { id, title, body } = res.data;
      return { id, title, body }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
  handleGetMedium: async (roomId) => {
    try {
      const res = await questionService.post(PREFIX_QUESTION_SVC + "/getMedium", { id: roomId });
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      const { id, title, body } = res.data;
      return { id, title, body }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
  handleGetHard: async (roomId) => {
    try {
      const res = await questionService.post(PREFIX_QUESTION_SVC + "/getHard", { id: roomId });
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

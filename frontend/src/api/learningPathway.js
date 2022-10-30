import { learningPathwayService } from "./client";
import { STATUS_CODE_OKAY, STATUS_CODE_CREATED } from "./responses";
import { ResponseException } from "./responses";

const PREFIX_RECORD_SVC = '/api/record'

export const learningPathwayAPI = {
  handleGetRecords: async (userId) => {
    try {
      const res = await learningPathwayService.get(PREFIX_RECORD_SVC + `/${userId}`);
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
      const { records } = res.data;
      return records
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
  handleAddRecord: async (userId, partnerUsername, questionDifficulty, questionId, questionTitle, code, code_language, timestamp) => {
    try {
      const newRecord = {
        user_id: userId,
        partner_username: partnerUsername,
        question_difficulty: questionDifficulty,
        question_id: questionId,
        question_title: questionTitle,
        code,
        code_language,
        timestamp
      }
      const res = await learningPathwayService.post(PREFIX_RECORD_SVC, newRecord);
      if (!(res && res.status === STATUS_CODE_CREATED)) {
        throw new Error()
      }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
  handleDeleteRecords: async (userId) => {
    try {
      const res = await learningPathwayService.delete(PREFIX_RECORD_SVC + `/${userId}`);
      if (!(res && res.status === STATUS_CODE_OKAY)) {
        throw new Error()
      }
    } catch (err) {
      throw new ResponseException('Please try again later')
    }
  },
}

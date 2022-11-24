import { learningPathwayService } from "./client";

const PREFIX_RECORD_SVC = '/api/record'

export const deleteUserRecords = async (userId: string) => {
  try {
    const res = await learningPathwayService.delete(PREFIX_RECORD_SVC + `/${userId}`);
    if (res && res.status === 200) {
      return;
    }
    throw new Error()
  } catch (err) {
    // TODO: log error
    return;
  }
}
import { userService } from "./validationClient.js";

const validateUserId = async (user_id) => {
  try {
    const res = await userService.post("/api/user/validate_user_id", { user_id });
    if (res && res.status === 200) {
      return true;
    }
  } catch (err) {
    return false
  }
}

export default validateUserId;
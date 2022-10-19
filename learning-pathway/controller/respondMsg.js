export const error_msg = {
  ADD_COMMENT_ERROR: "Could not add a new comment!",
  CREATION_ERROR: "Could not create a new record!",
  DATABASE_ERROR: "Database failure!",
  DELETE_ERROR: "Could not delete user records!",
  INVALID_FIELDS: "Invalid field(s) detected: ",
  READ_ERROR: "Could not retrieve user records!",
};

export const success_msg = {
  CREATE_SUCCESS_MESSAGE: "New record created successfully!",
  UPDATE_SUCCESS_MESSAGE: "Comment added successfully!",
};

// TODO: provide more message details
export const generateValidationError = (errors) => {
  return error_msg.INVALID_FIELDS + errors.map(e => e.param).join(", ")
}
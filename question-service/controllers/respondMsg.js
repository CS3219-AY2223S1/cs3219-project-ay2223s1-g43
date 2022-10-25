export const error_msg = {
  CREATION_ERROR: "Could not create a new question!",
  DATABASE_ERROR: "Database failure!",
  INVALID_FIELDS: "Invalid field(s) detected: ",
  READ_ERROR: "Could not retrieve question!",
};

export const success_msg = {
  CREATE_SUCCESS_MESSAGE: "New question created successfully!",
};

export const generateValidationError = (errors) => {
  const paramList = [... new Set(errors.map(e => e.param))]
  return { errors: error_msg.INVALID_FIELDS + paramList.join(", "), details: errors }
}
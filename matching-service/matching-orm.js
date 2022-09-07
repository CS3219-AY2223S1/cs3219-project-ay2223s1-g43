import { sequelize, DataTypes } from "./repository";

const models = {
  Match: getMatchModel(sequelize, DataTypes),
  PendingMatch: getPendingMatchModel(sequelize, DataTypes),
}

// Returns a Model instance of the Pending Match obj that is available for matching at the specified difficulty
export const isMatchAvailable = async (difficulty) => {
  const result = await models.PendingMatch.findOne({
    where: {
      difficulty: difficulty
    }
  });

  if (!result) {
    return false;
  } else {
    return result;
  }
}

export const insertNewPendingMatch = async (userName, difficulty) => {
  return await models.PendingMatch.create({
    userName,
    difficulty,
  })
}

export const deletePendingMatch = async (userName) => {
  return await models.PendingMatch.destroy({
    where: { userName: userName }
  })
}

export default models;

const { sequelize, DataTypes } = require('./repository.js')
const { getMatchModel } = require('./model/match');
const { getPendingMatchModel } = require('./model/pending-match');

const models = {
  Match: getMatchModel(sequelize, DataTypes),
  PendingMatch: getPendingMatchModel(sequelize, DataTypes),
}

exports.models = models;

// Returns a Model instance of the Pending Match obj that is available for matching at the specified difficulty
exports.isMatchAvailable = async (difficulty) => {
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

exports.insertNewPendingMatch = async (userName, difficulty) => {
  return await models.PendingMatch.create({
    userName,
    difficulty,
  })
}

exports.deletePendingMatch = async (userName) => {
  return await models.PendingMatch.destroy({
    where: { userName: userName }
  })
}

exports.insertNewMatch = async (userName1, userName2, difficulty) => {
  return await models.Match.create({
    userName1,
    userName2,
    difficulty
  })
}

exports.deleteMatch = async (userName) => {
  await models.Match.destroy({
    where: { userName1: userName }
  })
  await models.Match.destroy({
    where: { userName2: userName }
  })
}

exports.getNameOfUserMatchedTo = async (userName) => {
  let result = await models.Match.findOne({
    where: {
      userName1: userName
    }
  })

  if (result === null) {
    result = await models.Match.findOne({
      where: {
        userName2: userName
      }
    })

    if (result === null) {
      return result;
    }
    return result.userName1;

  } else {
    return result.userName2;
  }
}

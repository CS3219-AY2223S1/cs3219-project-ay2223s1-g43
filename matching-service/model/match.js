exports.getMatchModel = (sequelize, DataTypes) => {
  
  const Match = sequelize.define('Match', {

    userName1: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

    userName2: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      },
    }
  })

  return Match;
}


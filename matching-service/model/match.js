export default function getMatchModel(sequelize, DataTypes) {
  
  const Match = sequelize.define('Match', {

    userId_1: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

    userId_2: {
      type: DataTypes.BIGINT,
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
}


exports.getPendingMatchModel = (sequelize, DataTypes) => {
  const PendingMatch = sequelize.define("PendingMatch", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // cannot have 2 pending matches of the same user
      primaryKey: true,
    },
    
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      },
    },

  })

  return PendingMatch;
}
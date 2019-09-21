module.exports = function(sequelize, DataTypes) {
  var userCard = sequelize.define("userCard", {
    userCardId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    timeInterval: {
      type: DataTypes.INTEGER
    }
  });
  return userCard;
};

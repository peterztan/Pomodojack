module.exports = function(sequelize, DataTypes) {
  var deckCard = sequelize.define("deckCard", {
    deckCardId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  return deckCard;
};

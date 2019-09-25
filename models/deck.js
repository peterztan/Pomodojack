module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define("Deck", {
    deckName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Deck.associate = function(models) {
    Deck.belongsTo(models.Users);
    Deck.hasMany(models.Card);
  };

  return Deck;
};

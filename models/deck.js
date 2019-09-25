module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define("Deck", {
    deckName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Deck.associate = function(models) {
    // deck.belongsTo(models.user, { onDelete: "CASCADE" });
    Deck.hasMany(models.Card, {
      onDelete: "CASCADE"
    });
  };
  return Deck;
};

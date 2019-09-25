module.exports = function(sequelize, DataTypes) {
  var deck = sequelize.define("deck", {
    deckName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  deck.associate = function(models) {
    // deck.belongsTo(models.user, { onDelete: "CASCADE" });
    deck.hasMany(models.card, {
      onDelete: "CASCADE"
    });
  };
  return deck;
};

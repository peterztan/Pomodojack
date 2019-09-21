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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    deck.belongsTo(models.user, { onDelete: "CASCADE" });
    deck.hasMany(models.card, {
      onDelete: "CASCADE"
    });
  };
  return deck;
};

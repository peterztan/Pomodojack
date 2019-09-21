module.exports = function(sequelize, DataTypes) {
  var card = sequelize.define("card", {
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    taskDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  card.associate = function(models) {
    card.belongsToMany(models.deck, {
      onDelete: "CASCADE",
      through: models.deckCard
    });
    card.belongsToMany(models.user, {
      onDelete: "CASCADE",
      through: models.userCard
    });
  };
  return card;
};

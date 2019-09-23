module.exports = function(sequelize, DataTypes) {
  var card = sequelize.define("card", {
    cardTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    cardDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  card.associate = function(models) {
    card.belongsTo(models.deck, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return card;
};

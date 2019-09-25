module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
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
  Card.associate = function(models) {
    Card.belongsTo(models.Deck, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Card;
};

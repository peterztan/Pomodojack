module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
    cardTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardDescription: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Card.associate = function(models) {
    Card.belongsTo(models.Deck, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Card;
};

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
    card.belongsTo(models.deck, {
      onDelete: "CASCADE"
    });
    card.belongsTo(models.user, {
      onDelete: "CASCADE"
    });
  };
  return card;
};

// var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    userName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
    //   password: sequelize.TEXT
    // },
    // {
    //   hooks: {
    //     afterValidate: function(user) {
    //       user.password = bcrypt.hashSync(user.password, 8);
    //     }
    //   }
  });

  user.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    user.hasMany(models.deck, { onDelete: "CASCADE" });
  };

  return user;
};

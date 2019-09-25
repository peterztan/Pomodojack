var bcryptjs = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.hook("beforeCreate", function(user) {
    user.username = user.full_name.toLowerCase().replace(/\s/g, "");
    user.password = bcryptjs.hashSync(
      user.password,
      bcryptjs.genSaltSync(10),
      null
    );
    console.log(user);
  });

  Users.associate = function(models) {
    models.Users.hasMany(models.Posts);
  };

  return Users;
};

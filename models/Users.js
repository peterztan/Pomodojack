var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

  var Users = sequelize.define("Users", {
    // id: {
    //   type: DataTypes.STRING,
    //   unique: true,
    //   allowNull: false,
    //   primaryKey: true
    // },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      // unique: true,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Users.beforeCreate(function (user) {
    user.username = user.username.toLowerCase().replace(/\s/g, '');
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    console.log(user);
  });

  return Users;
};

var db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db
      .Users
      .findAll({
        attributes: ["username"]
      })
      .then((dbUsers) => {res.json(dbUsers);})
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500).json(err);
      });
  },
  findByName: function (req, res) {
    db
      .Users
      .findOne({
        attributes: ["username"],
        where: {
          username: req.params.username
        },
        include: [db.Posts]
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(404).json(err);
      });
  },
  userCheck: function(req, res) {
    if (req.user) {
      return res.json(req.user);
    }
    else {
      return res.status(422).json({error: "Not logged in!"});
    }
  },
  update: function (req, res) {
    db
      .Users
      .update(req.body, {
        where: {
          username: req.params.username
        }
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500).json(err);
      });
  },
  delete: function (req, res) {
    db
      .Users
      .destroy({
        where: {
          username: req.params.username
        }
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500).json(err);
      });
  },
  register: function(req, res) {
    db
      .Users
      .create(req.body)
      .then(function (userInfo) {
        // Upon successful signup, log user in
        req
          .login(userInfo, function (err) {
            if (err) {
              // eslint-disable-next-line no-console
              console.log(err);
              return res
                .status(422)
                .json(err);
            }
            // eslint-disable-next-line no-console
            console.log(req.user);
            return res.json("/");
          });
      })
      .catch(function (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res
          .status(422)
          .json(err);
      });
  },
  login: function(req, res) {
    // eslint-disable-next-line no-console
    console.log(req.user);
    res.json("/");
  }
};
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.deck.findAll({}).then(function(response) {
      res.render("index", {
        msg: "Welcome!",
        decks: response
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.user.deck
      .findOne({ where: { id: req.params.id } })
      .then(function(dbExample) {
        res.render("example", {
          example: dbExample
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

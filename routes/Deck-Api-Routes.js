var db = require("../models");

module.exports = function(app) {
  app.get("/api/deck", function(req, res) {
    db.deck
      .findAll({
        include: [db.card]
      })
      .then(function(dbDeck) {
        res.json(dbDeck);
      });
  });
  app.get("/api/deck/:id", function(req, res) {
    db.deck
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.card]
      })
      .then(function(dbDeck) {
        res.json(dbDeck);
      });
  });

  app.post("/api/deck", function(req, res) {
    db.deck.create(req.body).then(function(dbDeck) {
      res.json(dbDeck);
    });
  });

  app.delete("/api/deck/:id", function(req, res) {
    db.deck
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbDeck) {
        res.json(dbDeck);
      });
  });
};

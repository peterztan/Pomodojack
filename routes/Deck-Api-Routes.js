var db = require("../models");

module.exports = function(app) {
  app.get("/api/deck", function(req, res) {
    console.log("GET /api/deck");
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
    console.log(req.body);
    db.deck.create(req.body).then(function(dbDeck) {
      res.json(dbDeck);
    });
  });

  app.delete("/api/deck/:deckid", function(req, res) {
    db.deck
      .destroy({
        where: {
          deckid: req.params.deckid
        }
      })
      .then(function(dbDeck) {
        res.json(dbDeck);
      });
  });
};

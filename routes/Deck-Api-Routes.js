var db = require("../models");

module.exports = function(app) {
  app.get("/api/deck", function(req, res) {
    console.log("GET /api/deck");
    db.Deck.findAll({
      include: [db.Card]
    }).then(function(dbDeck) {
      res.json(dbDeck);
    });
  });
  app.get("/api/deck/:id", function(req, res) {
    db.Deck.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Card]
    }).then(function(dbDeck) {
      res.json(dbDeck);
    });
  });

  app.post("/api/deck", function(req, res) {
    console.log(req.body);
    db.Deck.create(req.body).then(function(dbDeck) {
      console.log("got here in deck api routes");
      res.json(dbDeck);
    });
  });

  app.delete("/api/deck/:id", function(req, res) {
    db.Deck.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDeck) {
      res.json(dbDeck);
    });
  });
};

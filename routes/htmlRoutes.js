var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Deck.findAll({
      include: [db.Card]
    }).then(function(dbDeck) {
      console.log(dbDeck);
      res.render("index", {
        msg: "Welcome!",
        deck: dbDeck
      });
    });
  });
  app.get("/decks", function(req, res) {
    db.Deck.findAll({
      include: [db.Card]
    }).then(function(dbDeck) {
      res.render("deck", {
        msg: "decks!",
        deck: dbDeck
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/card/:id", function(req, res) {
    var query = {};
    if (req.query.deckId) {
      query.deckId = req.query.deckId;
    }
    db.Card.findAll({
      where: query,
      include: [db.Deck]
    }).then(function(dbCard) {
      res.render("index", {
        msg: "All cards in this deck",
        card: dbCard
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

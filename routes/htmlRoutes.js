var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Deck.findAll({
      include: [db.Card]
    }).then(function(dbDeck) {
      // console.log(dbDeck);
      res.render("index", {
        msg: "Welcome!",
        deck: dbDeck
      });
      // res.render("card");
    });
  });
  app.get("/about", function(req, res) {
    db.Deck.findAll({}).then(function() {
      // console.log(dbDeck);
      res.render("about", {
        msg: "Welcome!",
        imgURL1: "https://ca.slack-edge.com/TJP3TP97Y-UJBLLF259-9b02def75c37-48",
        imgURL2: "https://ca.slack-edge.com/TJP3TP97Y-UJFTPC7NF-a8765baf70b1-48",
        imgURL3: "https://ca.slack-edge.com/TJP3TP97Y-UJR8X8V7G-5484d47d6590-48",
        imgURL4: "https://ca.slack-edge.com/TJP3TP97Y-UJC56RUPM-25da97de8c6c-48"
      });
      // res.render("card");
    });
  });
  app.get("/decks", function(req, res) {
    db.Deck.findAll({
      include: [db.Card]
    }).then(function(dbDeck) {
      res.render("deck", {
        msg: "Decks!",
        deck: dbDeck
      });
    });
  });
  app.get("/deck/:id", function(req, res) {
    db.Deck.findOne({ where: { id: req.params.id } }).then(function(dbDeck) {
      res.render("OneDeck", {
        deck: dbDeck
      });
    });
  });
  app.get("/cards", function(req, res) {
    db.Card.findAll({
      include: [db.Deck]
    }).then(function(dbCard) {
      res.render("OneDeck", {
        msg: "Cards!",
        card: dbCard
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

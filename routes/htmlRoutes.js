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
        imgURL1: "../public/images/petert.jpg",
        imgURL2: "../public/images/sandram.jpg",
        imgURL3: "../public/images/maggyj.jpg",
        imgURL4: "../public/images/#"
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

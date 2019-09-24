var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the cards from a deck
  app.get("/api/card/:deckId", function(req, res) {
    var query = {};
    if (req.query.deckId) {
      query.deckId = req.query.deckId;
    }

    db.card
      .findAll({
        where: query,
        include: [db.deck]
      })
      .then(function(dbCard) {
        res.json(dbCard);
      });
  });

  // Get route for retrieving a single card
  app.get("/api/card/:id", function(req, res) {
    db.card
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.deck]
      })
      .then(function(dbCard) {
        res.json(dbCard);
      });
  });

  // POST route for saving a new card
  app.post("/api/card", function(req, res) {
    db.card.create(req.body).then(function(dbCard) {
      res.json(dbCard);
    });
  });

  // DELETE route for deleting cards
  app.delete("/api/card/:id", function(req, res) {
    db.card
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbCard) {
        res.json(dbCard);
      });
  });

  // PUT route for updating cards
  app.put("/api/card", function(req, res) {
    db.card
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbCard) {
        res.json(dbCard);
      });
  });
};

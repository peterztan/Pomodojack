// Get references to page elements
var $deckname = $("#deckname");
var $submitBtn = $("#submit");
var $deckList = $("#deck-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveDeck: function(deck) {
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/deck",
      data: JSON.stringify(deck)
    });
  },
  getDecks: function() {
    $.ajax({
      url: "api/deck",
      type: "GET"
    });
  },
  deleteDeck: function(id) {
    $.ajax({
      url: "api/deck/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshDecks = function() {
  API.getDecks().then(function(data) {
    var $decks = data.map(function(deck) {
      var $a = $("<a>")
        .text(deck.deckname)
        .attr("href", "/decks/" + deck.deckid);

      var $li = $("<li>")
        .attr({
          class: "collection-item",
          "data-id": deck.deckid
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $deckList.empty();
    $deckList.append($decks);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var deck = {
    deckName: $deckname.val().trim()
  };

  if (!deck.deckName) {
    alert("You must enter a deck name");
    return;
  }

  API.saveDeck(deck).then(function() {
    refreshDecks();
  });

  $deckname.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshDecks();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$deckList.on("click", ".delete", handleDeleteBtnClick);

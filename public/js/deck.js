// Get references to page elements
var $deckText = $("#deck-text");
var $submitBtn = $("#submit");
var $deckList = $("#deck-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveDeck: function(deck) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/deck",
      data: JSON.stringify(deck)
    });
  },
  getDeck: function() {
    return $.ajax({
      url: "api/deck",
      type: "GET"
    });
  },
  deleteDeck: function(id) {
    return $.ajax({
      url: "api/deck/" + id,
      type: "DELETE"
    });
  }
};

// refreshdeck gets new deck from the db and repopulates the list
var refreshDeck = function() {
  API.getDeck().then(function(data) {
    var $decks = data.map(function(deck) {
      var $a = $("<a>")
        .text(deck.text)
        .attr("href", "/deck/" + deck.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": deck.id
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

// handleFormSubmit is called whenever we submit a new deck
// Save the new deck to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var deck = {
    deckName: $deckText.val().trim()
    // description: $exampleDescription.val().trim()
  };

  if (!deck.text) {
    alert("You must enter deck title");
    return;
  }

  API.saveDeck(deck).then(function() {
    refreshDeck();
  });

  deck.deckName.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an deck's delete button is clicked
// Remove the deck from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDeck(idToDelete).then(function() {
    refreshDeck();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$deckList.on("click", ".delete", handleDeleteBtnClick);

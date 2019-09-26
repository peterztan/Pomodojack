// Get references to page elements
var $deckname = $("#deckname");
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
  getDecks: function() {
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
var refreshDecks = function() {
  API.getDecks().then(function(data) {
    var $decks = data.map(function(deck) {
      var $a = $("<a>")
        .text(deck.deckName)
        .attr("href", "/deck/" + deck.id);

      var $div = $("<div>")
      // 1=ace 2=king 3=queen 4=jack 5=ten
        .attr({
          class: "card-item hoverable",
          "data-id": deck.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn-floating btn-small waves-effect waves-light red right delete")
        .text("ｘ");

      $div.append($button);

      return $div;
    });

    $deckList.empty();
    $deckList.append($decks);
  });
};

// handleFormSubmit is called whenever we submit a new deck
// Save the new deck to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("gets here to event");

  var deck = {
    deckName: $deckname.val().trim()
    // description: $exampleDescription.val().trim()
  };

  if (!deck.deckName) {
    alert("You must enter deck name");
    return;
  }

  API.saveDeck(deck).then(function() {
    refreshDecks();
  });

  $deckname.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an deck's delete button is clicked
// Remove the deck from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDeck(idToDelete).then(function() {
    refreshDecks();
  });
};

// // Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$deckList.on("click", ".delete", handleDeleteBtnClick);

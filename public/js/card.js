// Get references to page elements
var $cardText = $("#card-text");
var $cardDescription = $("#card-description");
var $submitBtn = $("#submit");
var $cardList = $("#card-list");

var cards;


var url = window.location.search;
var deckId;
if (url.indexOf("?deck_id=") !== -1) {
  deckId = url.split("=")[1];
  getPosts(deckId);
} else {
  getPosts();
}


// The API object contains methods for each kind of request we'll make
var API = {
  saveCard: function(deckId) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/card/" + deckId,
      data: JSON.stringify(card)
    });
  },
  getCards: function(deck) {
    // return $.ajax({
    //     return $.ajax({
    //         url: "api/card/" + deckId,
    //         type: "GET"
    //     });
    // });

    deckId = deck || "";
    if (deckId) {
      deckId = "/?deck_id=" + deckId;
    }
    $.get("/api/card/" + deckId, function(data) {
      console.log("card", data);
      cards = data;
      if (!cards || !cards.length) {
        displayEmpty(deck);
      } else {
        initializeRows();
      }
    });
  },
  deleteCard: function(id) {
    return $.ajax({
      url: "api/card/" + id,
      type: "DELETE"
    });
  }
};

// refreshdeck gets new deck from the db and repopulates the list
var refreshCards = function() {
  API.getCards().then(function(data) {
    var $cards = data.map(function(card) {
      var $a = $("<a>")
        .text(card.text)
        .attr("href", "/card/" + card.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": card.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $cardList.empty();
    $cardList.append($cards);
  });
};

// handleFormSubmit is called whenever we submit a new deck
// Save the new deck to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var card = {
    cardTitle: $cardText.val().trim(),
    cardDescription: $cardDescription.val().trim()
  };

  if (!card.text) {
    alert("You must enter card title");
    return;
  }

  API.saveCard(card).then(function() {
    refreshCards();
  });


  $cardDescription.val("");
};

// handleDeleteBtnClick is called when an deck's delete button is clicked
// Remove the deck from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteCard(idToDelete).then(function() {
    refreshCards();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$cardList.on("click", ".delete", handleDeleteBtnClick);

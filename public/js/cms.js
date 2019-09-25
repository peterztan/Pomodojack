// /* eslint-disable indent */
// $(document).ready(function() {
//   // Getting jQuery references to the card body, title, form, and deck select
//   var bodyInput = $("#body");
//   var titleInput = $("#title");
//   var cmsForm = $("#cms");
//   var deckSelect = $("#deck");
//   // Adding an event listener for when the form is submitted
//   $(cmsForm).on("submit", handleFormSubmit);
//   // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
//   var url = window.location.search;
//   var cardId;
//   var deckId;
//   // Sets a flag for whether or not we're updating a post to be false initially
//   var updating = false;

//   // If we have this section in our url, we pull out the post id from the url
//   // In '?post_id=1', postId is 1
//   if (url.indexOf("?card_id=") !== -1) {
//     cardId = url.split("=")[1];
//     getCardData(cardId, "card");
//   }
//   // Otherwise if we have an author_id in our url, preset the author select box to be our Author
//   else if (url.indexOf("?deck_id=") !== -1) {
//     deckId = url.split("=")[1];
//   }

//   // Getting the authors, and their posts
//   getDecks();

//   // A function for handling what happens when the form to create a new post is submitted
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     // Wont submit the post if we are missing a body, title, or author
//     if (
//       !titleInput.val().trim() ||
//       !bodyInput.val().trim() ||
//       !deckSelect.val()
//     ) {
//       return;
//     }
//     // Constructing a newPost object to hand to the database
//     var newCard = {
//       title: titleInput.val().trim(),
//       body: bodyInput.val().trim(),
//       deckId: deckSelect.val()
//     };

//     // If we're updating a post run updatePost to update a post
//     // Otherwise run submitPost to create a whole new post
//     if (updating) {
//       newCard.id = cardId;
//       updateCard(newCard);
//     } else {
//       submitCard(newCard);
//     }
//   }

//   // Submits a new post and brings user to blog page upon completion
//   function submitCard(card) {
//     $.post("/api/card", card, function() {
//       window.location.href = "/cardsList";
//     });
//   }

//   // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
//   function getCardData(id, type) {
//     var queryUrl;
//     switch (type) {
//       case "post":
//         queryUrl = "/api/posts/" + id;
//         break;
//       case "author":
//         queryUrl = "/api/authors/" + id;
//         break;
//       default:
//         return;
//     }
//     $.get(queryUrl, function(data) {
//       if (data) {
//         console.log(data.deckId || data.id);
//         // If this post exists, prefill our cms forms with its data
//         titleInput.val(data.title);
//         bodyInput.val(data.body);
//         deckId = data.deckId || data.id;
//         // If we have a post with this id, set a flag for us to know to update the post
//         // when we hit submit
//         updating = true;
//       }
//     });
//   }

//   // A function to get Authors and then render our list of Authors
//   function getDecks() {
//     $.get("/api/deck", renderDeckList);
//   }
//   // Function to either render a list of authors, or if there are none, direct the user to the page
//   // to create an author first
//   function renderDeckList(data) {
//     if (!data.length) {
//       window.location.href = "/deckList";
//     }
//     $(".hidden").removeClass("hidden");
//     var rowsToAdd = [];
//     for (var i = 0; i < data.length; i++) {
//       rowsToAdd.push(createDeckRow(data[i]));
//     }
//     deckSelect.empty();
//     console.log(rowsToAdd);
//     console.log(deckSelect);
//     deckSelect.append(rowsToAdd);
//     deckSelect.val(deckId);
//   }

//   // Creates the author options in the dropdown
//   function createDeckRow(deck) {
//     var listOption = $("<option>");
//     listOption.attr("value", deck.id);
//     listOption.text(deck.name);
//     return listOption;
//   }

//   // Update a given post, bring user to the blog page when done
//   function updateCard(card) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/card",
//       data: card
//     }).then(function() {
//       window.location.href = "/cardList";
//     });
//   }
// });


var topics = [
  "Football",
  "The Office TV Show",
  "Braveheart",
  "Cat",
  "Apples",
  "emoji"
];

// =========== Function for dumping the JSON content for each button into the div
// function displayTopicInfo(topic) {
//   var queryURL =
//     "https://api.giphy.com/v1/gifs/search?q=" +
//     topic +
//     "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
//   console.log(queryURL);
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     var results = response.data;
//     console.log(results);

//     for (var i = 0; i < results.length; i++) {
//       var topicDiv = $("<div>");
//       var p = $("<p>");
//       p.text(results[i].rating.toUpperCase());
//       var topicImage = $("<img id=\"gif\">");
//       topicImage.attr("src", results[i].images.fixed_height.url);
//       topicImage.attr("data-animate", results[i].images.fixed_height.url);
//       topicImage.attr("data-still", results[i].images.fixed_height_still.url);
//       console.log("still=" + results[i].images.fixed_height_still.url);
//       topicImage.attr("data-state", "still");
//       topicDiv.append(p);
//       topicDiv.append(topicImage);
//       $("#topic-view").prepend(topicDiv);
//     }
//   });
// }
// =========== Function for displaying movie data
function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $('<button type="button" class="btn btn-primary">');
    a.addClass("topicClass");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

//  ===========  This function handles events where one button is clicked
$("#btnSubmit").on("click", function(event) {
  event.preventDefault();

  var topicEntry = $("#topic")
    .val()
    .trim();
  topics.push(topicEntry);
  $("#topic").val("");

  renderButtons();
});

//  ===========  MAIN
// $(document).ready(function() {
//   $('[data-toggle="tooltip"]').tooltip();
// });

$(document).on("click", ".topicClass", function() {
  var topicSelected = $(this).attr("data-name");
  $("#topic-view").html("");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topicSelected +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div>");
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);
      var topicImage = $(
        '<img data-toggle="tooltip" title="Click to stop animation!" class="gif">'
      );
      topicImage.attr("src", results[i].images.fixed_height.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);
      topicImage.attr("data-state", "still");

      topicDiv.append(p);
      topicDiv.append(topicImage);
      $("#topic-view").prepend(topicDiv);
    }
  });
});

$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    $(this).attr("title", "Click to stop animation!");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    $(this).attr("title", "Click to start animation!");
  }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

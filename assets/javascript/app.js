var topics = ["bird", "dog", "cat"];

// =========== Function for dumping the JSON content for each button into the div
function displayTopicInfo(topic) {
  //   var topic = $(this).val();
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {


    console.log(response);
    var results = response.data;
    console.log(results);

    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div>");
      var p = $("<p>");
      p.text(results[i].rating);
      var topicImage = $("<img>");
      topicImage.attr("src", results[i].images.fixed_height.url);
      topicDiv.append(p);
      topicDiv.append(topicImage);
      $("#topic-view").prepend(topicDiv);
    }
  });
}
// =========== Function for displaying movie data
function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    // var a = $('<button type="button" class="btn btn-default">');
    var a = $('<button>');
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
  console.log("btnSubmit onclick: " + topicEntry);
  topics.push(topicEntry);

  renderButtons();
});

//  ===========  MAIN
// $(".topicClass").on("click"), function() {
//   alert("hello");
// }
// Generic function for displaying the movieInfo
$(document).on("click", '.topicClass', function() {
  var topicSelected = $(this).attr("data-name");
  console.log("topic button click: " + topicSelected);
  $("#topic-view").html("");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topicSelected +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    console.log(results);

    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div>");
      var p = $("<p>");
      p.text(results[i].rating);
      var topicImage = $("<img>");
      topicImage.attr("src", results[i].images.fixed_height.url);
      topicDiv.append(p);
      topicDiv.append(topicImage);
      $("#topic-view").prepend(topicDiv);
    }
  });
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

var topics = ["bird", "dog", "cat"];

// =========== Function for dumping the JSON content for each button into the div
function displayTopicInfo(topic) {
  //   var movie = $(this).attr("data-name");
  //   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  //   // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   })
  //     // We store all of the retrieved data inside of an object called "response"
  //     .then(function(response) {
  //       strResponse = JSON.stringify(response);
  //       $("#movie-view").html(strResponse);

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
    // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
    // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

    console.log(response);

    // Step 2: since the image information is inside of the data key,
    // make a variable named results and set it equal to response.data

    // =============== put step 2 in between these dashes =================
    var results = response.data;
    console.log(results);
    // ========================

    for (var i = 0; i < results.length; i++) {
      // Step 3: uncomment the for loop above and the closing curly bracket below.
      // Make a div with jQuery and store it in a variable named topicDiv.
      var topicDiv = $("<div>");
      // Make a paragraph tag with jQuery and store it in a variable named p.
      var p = $("<p>");
      // Set the inner text of the paragraph to the rating of the image in results[i].
      p.text(results[i].rating);
      // Make an image tag with jQuery and store it in a variable named topicImage.
      var topicImage = $("<img>");
      // Set the image's src to results[i]'s fixed_height.url.
      topicImage.attr("src", results[i].images.fixed_height.url);
      // Append the p variable to the topicDiv variable.
      topicDiv.append(p);
      // Append the topicImage variable to the topicDiv variable.
      topicDiv.append(topicImage);
      // Prepend the topicDiv variable to the element with an id of gifs-appear-here.
      $("#topic-view").prepend(topicDiv);
      // ============= put step 3 in between these dashes ======================

      // ==================================
    }
  });
}
// =========== Function for displaying movie data
function renderButtons() {
  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $('<button type="button" class="btn btn-default">');
    // Adding a class of movie to our button
    a.addClass("topicClass");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

//  ===========  This function handles events where one button is clicked
$("#btnSubmit").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var topicEntry = $("#topic")
    .val()
    .trim();
  console.log("btnSubmit onclick: " + topicEntry);
  // The topic from the textbox is then added to our array
  topics.push(topicEntry);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

//  ===========  MAIN

// Generic function for displaying the movieInfo
$("topicClass").on("click", function() {
  var topicSelected = $(this).attr("data-name");
  var topicSelected = "lion";
  console.log("topic button click: " + topicSelected);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topicSelected +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
    // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

    console.log(response);

    // Step 2: since the image information is inside of the data key,
    // make a variable named results and set it equal to response.data

    // =============== put step 2 in between these dashes =================
    var results = response.data;
    console.log(results);
    // ========================

    for (var i = 0; i < results.length; i++) {
      // Step 3: uncomment the for loop above and the closing curly bracket below.
      // Make a div with jQuery and store it in a variable named topicDiv.
      var topicDiv = $("<div>");
      // Make a paragraph tag with jQuery and store it in a variable named p.
      var p = $("<p>");
      // Set the inner text of the paragraph to the rating of the image in results[i].
      p.text(results[i].rating);
      // Make an image tag with jQuery and store it in a variable named topicImage.
      var topicImage = $("<img>");
      // Set the image's src to results[i]'s fixed_height.url.
      topicImage.attr("src", results[i].images.fixed_height.url);
      // Append the p variable to the topicDiv variable.
      topicDiv.append(p);
      // Append the topicImage variable to the topicDiv variable.
      topicDiv.append(topicImage);
      // Prepend the topicDiv variable to the element with an id of gifs-appear-here.
      $("#topic-view").prepend(topicDiv);
      // ============= put step 3 in between these dashes ======================

      // ==================================
    }
  });
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

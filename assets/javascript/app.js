// Declare initial array of button topics
var topics = ["Satoshi Kon", "David Lynch", "Guillermo del Toro", "Alfred Hitchcock", "Hayao Miyazaki", "Akira Kurosawa", "Hideo Kojima", "Stanley Kubrick", "Coen Brothers", "David Fincher", "Mamoru Oshii", "Wes Anderson", "Kunihiko Ikuhara"];

// Initialize function to populate button div with buttons from the array
function Initialize() {
    // Clear any topic buttons
    $("#display-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        addButton(topics[i]);
    }
};

// Function to add a new button to the buttons div
function addButton(name) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-sm btn-info");
    newButton.attr("data", name);
    newButton.text(name);
    $("#display-buttons").append(newButton);
};

Initialize();

// When a button is clicked, make a Giphy API call for 10 gifs of that button's topic
$(document).on("click", "button", function() {
    // Clear gifs div
    $("#display-gifs").empty();

    // Get topic for new gifs
    var topic = $(this).attr("data");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    topic + "&api_key=FSuIocZQoIF1XNjs9UPc3X6fdOupGMzX&limit=10&rating=pg-13"

    // Perform AJAX GET request for 10 gifs of predefined parameters
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
        var results = response.data;
        // Loop through results array and create still img/gif for each one
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var topicImage = $("<img>");

            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");
            topicImage.addClass("gif");

            gifDiv.append(p);
            gifDiv.append(topicImage);

            $("#display-gifs").append(gifDiv);
        }
    });
});

// When still/gif is clicked, reverse state
$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// When "Submit" button is clicked, add a new topic button that will populate new gifs
$(document).on("click", "#addtopic", function() {
    event.preventDefault();
    var topic = $("#topic-input").val();
    topics.push(topic);
    Initialize();
});
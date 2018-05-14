$(document).ready(function () {

    var shows = ["Scrubs", "Gossip Girl", "Brooklyn Nine Nine"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayMovieInfo() {
        $('#gis-appear-here').empty()
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            show + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creates AJAX call for the specific button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var showImage = $("<img>");
                showImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(showImage);

                $("#gifs-appear-here").prepend(gifDiv);
                console.log(results[i].images.fixed_height.url)
            }
        });
    }
    // Function for displaying movie data
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < shows.length; i++) {
            var a = $("<button>");
            a.addClass("show");
            a.attr("data-name", shows[i]);
            a.text(shows[i]);
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where the add movie button is clicked
    $("#add-show").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var show = $("#show-input").val().trim();

        // The movie from the textbox is then added to our array
        shows.push(show);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "movie"
    $(document).on("click", ".show", displayMovieInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});
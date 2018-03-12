//on click this whole function will run to show giphy
$(".giphybutton").on("click", function () {
    var searchTerm = $(this).attr("data-animal");
    console.log(searchTerm);
    getGiphyImages(searchTerm);

});



function createButton(buttontext) {

    var giphybtn = $("<button class='giphybutton'>");
    //make the button have the attribute of the input value.
    giphybtn.attr("data-animal", buttontext);
    //display the text in the button.
    giphybtn.text(buttontext);

    console.log(buttontext);
    //add the button to the webpage
    $("#buttons").append(giphybtn);
    // resetEvent();
    //start with having button off, removes the event hanlders
    $(".giphybutton").off();
    // add the event hanlder back on
    $(".giphybutton").on("click", function () {
        //this function grabs the value of animal button 
        var searchTerm = $(this).attr("data-animal");
        console.log(searchTerm);
        // to call the api to make the picture
        getGiphyImages(searchTerm);

    });

}

function buttonloop(arr) {
    for (var i = 0; i < arr.length; i++) {
        createButton(arr[i]);
    }
};



var getGiphyImages = function (searchTerm) {

    //line below i need explained why. // change this to my API key once i know it's working "&api_key=yZNwu1yeW43l6qLRlbla9i8S56ZkLL4O"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

    //console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //if this doesn't work try data.images.fixed_height:
        var results = response.data;
        console.log(results);

        //add array for buttons
        //for loop so we go through all the data in the api array
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("rating: " + rating);
            var animalImage = $("<img class='imageClick'>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            //adding in the still image and the data animated.
            animalImage.attr("data-alt", results[i].images.fixed_height.url);


            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);
            $("#gifs-go-here").prepend(gifDiv);
        }

        $(".imageClick").off();
        $(".imageClick").on("click", function () {
            var imgSrc = $(this).attr("src");
            var imgAlt = $(this).attr("data-alt");
            $(this).attr("src", imgAlt);
            $(this).attr("data-alt", imgSrc);
            console.log(imgSrc);
            console.log(imgAlt);
        });


    });


};


//submits the form to create the new button
//# is where it will go, submit sends the text to be made 
$("#animal-form").submit(function (event) {
    //input the value from the user input, remove any blank space.
    var input = $("#animal-input").val().trim();
    //create the button
    createButton(input);
    //when they click the form, we clear out the value of the text box.
    $("#animal-input").val("");
    //preventing the form from submitting.
    event.preventDefault();




    //<button class="giphybutton" data-animal="penguin">Penguin, waddle waddle</button>

});

//the array for making buttons on opening.
buttonloop(['penguin', 'cat', 'dog', 'bunny', 'kitten', 'kangaroo', 'elephant', 'caterpillar', 'horse', 'lion', 'tiger', 'bear']);

var url = window.location.href;

// var url = "https://aangl3r.github.io/Project1/inner.html/" +
//     "#access_token=BQATyTK5V03tEftZZxUWi-JgStXn6nFjo6R9e-M7kQAr1wgD--bW4mtHqD2LjdjfPkI4FY4Fx5scpmDxMQvaKFVKe4gL98HL3dYqn-H7vtkNMiUN0SUE55BkPBQEokuiAepGXgB2eGxe8yMuJ5vA8MddAzf4pX4" +
//     "&token_type=Bearer&expires_in=3600";

console.log(url.split("access_token="));
url = url.split("access_token=");
url = url[1].split("&");
console.log("TCL: url", url);

var token = url[0];

var errExists = false;

// Create function to grab music based on face data
// features: float of overall mood (from 0.0 - 1.0) where 1.0 is maximum happy
// genres: string array of genres the user chose
function getPlaylist(mood, genres) {
    
    // include error message if user passes in no genres
    if (genres.length === 0) {
        // if there hasn't already been an error (of this sort), add the error message to the #header div (jumbotron)
        if (!errExists) {
            var errMsg = $("<div>");
            errMsg.
                attr("id", "genre-error").
                text("Please select at least one genre");
            $("#header").append(errMsg);
            errExists = true;
        }
        return;
    }

    // Otherwise, function will proceed as planned, and remove error message
    $("#genre-error").remove();
    errExists = false;

    // Set base query URL
    var queryURL = "https://api.spotify.com/v1/recommendations?limit=20&market=ES&seed_genres=";

    // add each genre to seed_genre
    for (i = 0; i < genres.length; i++) {
        if (i > 0) queryURL += ",";
        queryURL += genres[i];
    }

    queryURL += "&target_valence=" + mood;

    $.ajax({
        url: queryURL,
        headers: {
            "Authorization": "Bearer " + token
        },
        error: function (err) {
            console.log("you done messed up");
        },
        success: function (data) {
            console.log(data);
            var tracks = data.tracks;
            for (i = 0; i < tracks.length; i++) {
                console.log(tracks[i].id);
            }

            // Use the tracks we receive to populate chosen playlist

            // add playlist to firebase

        }
    });

}

/* var searchTerms = [];
searchTerms.push("min_danceability=.8");
searchTerms.push("min_energy=.8");

var queryURL = "https://api.spotify.com/v1/recommendations?limit=5&market=ES&seed_genres=country";

// for (var i = 0; i < searchTerms.length; i++) {
//     if (i === 0) queryURL += "?";
//     else queryURL += "&";
//     queryURL += searchTerms[i];
// }

console.log("TCL: queryURL", queryURL);

$.ajax({
    url: queryURL,
    headers: {
        "Authorization": "Bearer " + token
    },
    error: function (err) {
        console.log("you done messed up");
    },
    success: function (data) {
        console.log(data);
        var tracks = data.tracks;
        for (i = 0; i < tracks.length; i++) {
            console.log(tracks[i].id);
        }
    }
}); */
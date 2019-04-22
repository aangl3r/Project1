var url = window.location.href;

// commented code below used for debugging

// var url = "https://aangl3r.github.io/Project1/inner.html/" +
//     "#access_token=" +
//     "BQCpwSUOMmD8Nrj-3wCro8oyiLgTJmGnxqXxkrIdbByyPrf3M14q0H-k6mEf9xLyBd5SQ3afEgOaSctYEuGnemuecfFOHpUxzUx8YyaleHOlIP91u-QUt9TGHmU9NbvTgHuemdu92QEDlHBlDzETWUbhUhIFWaaGQKfGInpR46yPmdn0cLM9XHvI4wpk" +
//     "&token_type=Bearer&expires_in=3600";

console.log(url.split("access_token="));
url = url.split("access_token=");
url = url[1].split("&");

console.log("TCL: url", url);

var token = url[0];
// Create function to populate playlist in DOM
// tracks is an array of track ids per spotify api
function populatePlaylist(tracks) {
    // clear active playlist
    $("tbody").empty();
    var playlistIndex = 1;

    // Use the tracks we receive to populate chosen playlist
    for (var i = 0; i < tracks.length; i++) {

        $.ajax({
            url: "https://api.spotify.com/v1/tracks/" + tracks[i].id,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (data) {

                // create table row to hold data
                var newSong = $("<tr>");

                // create vars to hold info
                var songName;
                var songArtist;
                var songDuration;

                // retrieve song name, artist and duration
                // and convert duration_ms to mm:ss
                songName = data.name;
                songArtist = data.artists[0].name;

                var durationMS = data.duration_ms;
                var durationS = durationMS / 1000;
                var remainder = Math.round(durationS % 60);
                if (remainder < 10) remainder = "0" + remainder;
                songDuration = Math.floor(durationS / 60) + ":" + remainder;

                // append the data to the new row
                newSong.append(
                    $(
                        "<td scope='row'>" + playlistIndex + "</td>" +
                        '<td><i class="far fa-play-circle d-none" data-song-name="' + songName + '"></i>' + songName + '</td>' +
                        "<td>" + songArtist + "</td>" +
                        "<td>" + songDuration + "</td>"
                    )
                );

                // append the row to the table
                $("tbody").append(newSong);
                playlistIndex++;
                tracks_ready = true;

            }
        });
    }
    database.ref().push({
        sourceImageUrl,
        happiness,
        energy,
        tracks
    });
}

// Create function to grab music based on face data
// moods: array consisting of [happiness, energy]: both values from 0.0 to 1.0
// genres: string array of genres the user chose
function getPlaylist(moods, genres) {

    // create variables to hold username & tracks
    var username;
    var tracks;

    $.when(

        // we first need to grab the user name to later add the playlist to their spotify
        $.ajax({
            url: "https://api.spotify.com/v1/me",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            error: function (err) {
                console.log("you done messed up");
            },
            success: function (data) {
                username = data.id;
                console.log("TCL: getPlaylist -> username", username)
            }
        })

    ).then(function () {

        // Set base query URL
        var queryURL = "https://api.spotify.com/v1/recommendations?limit=20&market=ES&seed_genres=";

        // add each genre to seed_genre
        for (i = 0; i < genres.length; i++) {
            if (i > 0) queryURL += ",";
            queryURL += genres[i];
        }

        // add mood values passed in as target valence and target enerfy search queries
        queryURL += "&target_valence=" + moods[0] + "&target_energy=" + moods[1];

        // ajax call to grab 20 songs.
        // We will also call the function to add them to the DOM's playlist
        // and return the track ids so that they can be added to firebase database
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
                tracks = data.tracks;
                for (i = 0; i < tracks.length; i++) {
                    console.log(tracks[i].id);
                }

                populatePlaylist(tracks);

                return tracks;

            }
        });

    });


}

// Click an image's spotify logo to load its previously generated playlist
$(document).on("click", ".spotify-logo", function() {
    keyref = $(this).parent().children()[0].getAttribute("data-key");
    database.ref(keyref).once('value').then(function(snap) {
        populatePlaylist(snap.val().tracks);
    });

    expandPlaylist();
})
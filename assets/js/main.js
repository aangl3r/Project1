// Initialize Firebase

var config = {
    apiKey: "AIzaSyBQqRq6n3wUUT8bFcfOTUzuiakp5vSGGPw",
    authDomain: "project-1-e2f27.firebaseapp.com",
    databaseURL: "https://project-1-e2f27.firebaseio.com",
    projectId: "project-1-e2f27",
    storageBucket: "project-1-e2f27.appspot.com",
    messagingSenderId: "717231325761"
};
firebase.initializeApp(config);

var database = firebase.database();

var availableGenres = [
    "acoustic",
    "alternative",
    "blues",
    "classical",
    "country",
    "dubstep",
    "edm",
    "emo",
    "folk",
    "gospel",
    "goth",
    "grunge",
    "hardcore",
    "hip-hop",
    "house",
    "indie",
    "jazz",
    "k-pop",
    "kids",
    "metal",
    "piano",
    "pop",
    "punk",
    "r-n-b",
    "reggae",
    "rock",
    "soundtracks",
    "study",
]

generateGenre();

/*-------------------------- 
  Listeners
--------------------------*/
// to expand playlist via button
$('#playlist-popup-expand').on('click', expandPlaylist);

// to collapse playlist via button
$(document).on('click', '#playlist-popup-collapse', collapsePlaylist);

// to show spotify logo from library images
$('#pics-go-here').on('mouseover', '.mood-card', showSpotify)
    .on('mouseleave', '.mood-card', hideSpotify);


/*-------------------------- 
    Functions
--------------------------*/
function generateGenre() {
    var genreOrdered = availableGenres.sort();
    for (var i = 0; i < availableGenres.length; i++) {
        $('#genre-container').append(`
            <div class="form-check genre-wrapper">
                <input class="form-check-input" type="checkbox" id="${genreOrdered[i]}" value="option1">
                <label class="form-check-label" for="${genreOrdered[i]}">${genreOrdered[i]}</label>
            </div>
        `);
    }
}

function expandPlaylist() {
    $('#playlist-popup').append(`
        <div id="playlist-popup-collapse" class="playlist-tabs">
            <i class="far fa-arrow-alt-circle-down"></i>
        </div>
    `);

    $('#playlist-popup').find('table')
        .css('right', '0px');

}

function collapsePlaylist() {
    $(this).remove();

    $('#playlist-popup').find('table')
        .css('right', '-100%');
}

function showSpotify() {
    $(this).find('.shadow')
        .css('filter','opacity(0.5)');
    $(this).find('.spotify-logo')
        .css({
            'margin-top':'-76px',
            'filter':'opacity(1)'
        });
}

function hideSpotify() {
    $(this).find('.shadow')
        .css('filter','opacity(0)');
    $(this).find('.spotify-logo')
        .css({
            'margin-top':'200px',
            'filter':'opacity(0)'
        });
}
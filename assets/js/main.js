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

var isPlaying = false;

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

// toggle spotify logo from library images
$('#pics-go-here').on('mouseover', '.mood-card', showBtns)
    .on('mouseleave', '.mood-card', hideBtns);

// toggle play icon on playlist
$('tbody').on('mouseover', 'tr', showPlayIcon)
    .on('mouseleave', 'tr', hidePlayIcon);

// to switch play icon to pause icon
$('tbody').on('click', '.fa-play-circle', swapToPauseIcon);

// to switch pause icon to play icon
$('tbody').on('click', '.fa-pause-circle', swapToPlayIcon);

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

    $('#playlist-popup').find('#table-wrapper')
        .css('right', '0px');

}

function collapsePlaylist() {
    $(this).remove();

    $('#playlist-popup').find('#table-wrapper')
        .css('right', '-100%');
}

function showBtns() {
    $(this).find('.shadow')
        .css('filter', 'opacity(0.5)');
    $(this).find('.spotify-logo')
        .css({
            'margin-top': '-76px',
            'filter': 'opacity(1)'
        });

    $(this).find('.remove')
        .css({
            'margin-top': '0px',
            'filter': 'opacity(.8)'
        });
}

function hideBtns() {
    $(this).find('.shadow')
        .css('filter', 'opacity(0)');
    $(this).find('.spotify-logo')
        .css({
            'margin-top': '200px',
            'filter': 'opacity(0)'
        });

    $(this).find('.remove')
        .css({
            'margin-top': '-50px',
            'filter': 'opacity(0)'
        });
}

function showPlayIcon() {
    $(this).css('background-color', '#542054');
    $(this).find('.fa-play-circle')
        .css('display', 'inline-block');
}

function hidePlayIcon() {
    $(this).css('background-color', 'transparent');
    $(this).find('.fa-play-circle')
        .css('display', 'none');
}

function swapToPauseIcon() {
    if (!isPlaying){
        $(this)
            .removeClass('fa-play-circle')
            .addClass('fa-pause-circle');
    }
    isPlaying = true;
}

function swapToPlayIcon() {
    $(this)
        .removeClass('fa-pause-circle')
        .addClass('fa-play-circle');
    isPlaying = false;
}
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
/*-------------------------- 
    Click listeners
--------------------------*/ 
// to expand playlist via button
$('#playlist-popup-expand').on('click', expandPlaylist);

// to collapse playlist via button
$(document).on('click', '#playlist-popup-collapse', collapsePlaylist);


/*-------------------------- 
    Functions
--------------------------*/ 
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
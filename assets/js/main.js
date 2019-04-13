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
    <div id="playlist-popup-collapse" class="playlist-tabs">v Collapse v</div>
    `);

    $('#playlist-popup').css('right', '-1px');

}

function collapsePlaylist() {
    $(this).remove();

    $('#playlist-popup').css('right', '-1000px');
}
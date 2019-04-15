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
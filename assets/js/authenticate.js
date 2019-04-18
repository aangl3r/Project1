var redirect_uri = window.location.href + "inner.html";

var clientID = "05124bd3d3bb4dc2b9eaa0a5303bde98";

var scopes = "user-read-private playlist-modify-private";

var queryURL = "https://accounts.spotify.com/authorize?" +
    "client_id=" + clientID + "&" +
    "response_type=token&" +
    "redirect_uri=" + redirect_uri + "&" +
    "scope=" + scopes;

window.location.href = queryURL;
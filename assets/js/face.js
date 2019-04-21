// <!-- Much of this program was taken from https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/javascript -->

// create var to keep track of genre error message
var errExists = false;
var sourceImageUrl;
var happiness;
var energy;
var tracks;

$('#submit').on('click', processImage);

function processImage() {
   // Replace <Subscription Key> with your valid subscription key.
   var subscriptionKey = "a9fb99f9425242aaaf9edb0b064beb90";
   var uriBase =
      "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

   // Request parameters.
   var params = {
      "returnFaceId": "false",
      "returnFaceLandmarks": "false",
      "returnFaceAttributes":
         "emotion"
   };

   // sourceImageUrl will hold the url for our pic to be analyzed
   sourceImageUrl = $('#file-input').val();

   // Perform the REST API call.
   $.ajax({
      url: uriBase + "?" + $.param(params),
      // Request headers.
      beforeSend: function (xhrObj) {
         xhrObj.setRequestHeader("Content-Type", "application/json");
         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
      },
      type: "POST",
      // Request body.
      data: '{"url": ' + '"' + sourceImageUrl + '"}',
   })
      .done(function (data) {
         // emotions object to hold all relevant/irrelevant emotion info
         var emotions = {
            anger: data[0].faceAttributes.emotion.anger,
            contempt: data[0].faceAttributes.emotion.contempt,
            disgust: data[0].faceAttributes.emotion.disgust,
            happiness: data[0].faceAttributes.emotion.happiness,
            fear: data[0].faceAttributes.emotion.fear,
            neutral: data[0].faceAttributes.emotion.neutral,
            sadness: data[0].faceAttributes.emotion.sadness,
            surprise: data[0].faceAttributes.emotion.surprise
         }
         var topEmo;
         var value = 0;
         Object.keys(emotions).forEach(function (key) {
            if (emotions[key] > value) {
               value = emotions[key];
               topEmo = key;
            }
         })
         happiness = emotions.happiness;
         var anger = emotions.anger;
         var contempt = emotions.contempt;
         var surprise = emotions.surprise;
         var fear = emotions.fear;
         var disgust = emotions.disgust;
         energy = anger + contempt + surprise + fear + disgust;

         if (energy > 1) {
            energy = 1;
         }

         var genres = [];
         // Find selected genres
         $.each($(".form-check-input:checked"), function () {
            console.log($(this).attr("id"));
            genres.push($(this).attr("id"));
         })

         // display error message if user passes in no genres
         if (genres.length === 0) {
            // if there hasn't already been an error (of this sort), add the error message to the #header div (jumbotron)
            if (!errExists) {
               var errMsg = $("<p>");
               errMsg.
                  attr("id", "genre-error").
                  attr("class", "lead text-white").
                  text("Please select at least one genre");
               $("#header").append(errMsg);
               errExists = true;
            }
            return;
         }

         // Otherwise, function will proceed as planned, and remove error message
         $("#genre-error").remove();
         errExists = false;

         tracks = getPlaylist([happiness, energy], genres);


         // database.ref().push({
         //    sourceImageUrl,
         //    happiness,
         //    energy,
         //    tracks
         // });
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
         // Display error message.
         var errorString = (errorThrown === "") ?
            "Error. " : errorThrown + " (" + jqXHR.status + "): ";
         errorString += (jqXHR.responseText === "") ?
            "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
               jQuery.parseJSON(jqXHR.responseText).message :
               jQuery.parseJSON(jqXHR.responseText).error.message;
         alert(errorString);
      });
   
   // clear URL input
   $("#file-input").val('');

   // scroll to image section
   $('html, body').animate({
      scrollTop: ($('#pics-go-here').offset().top)
   }, 500);

   // show playlist
   expandPlaylist();
};
// The child_added listener for our database, to put the image and happiness factor
// into the DOM
database.ref().on("child_added", function (childSnapshot) {
   var image = childSnapshot.val().sourceImageUrl;
   var happiness = childSnapshot.val().happiness;
   var energy = childSnapshot.val().energy;
   var key = childSnapshot.key


   $('#pics-go-here').prepend(`
      <div class="card mood-card">
      <div class="btn btn-danger remove" data-key=${key}>X</div>
         <img class="card-img-top" src="${image}" alt="Card image cap">
         <div class="mood-name">Happiness: ${parseInt(happiness * 10)} out of 10.</div>
         <div class="mood-level">Energy: ${parseInt(energy * 10)} out of 10.</div>
         <div class="shadow"></div>
         <i class="fab fa-spotify spotify-logo" data-happiness="${happiness}" data-energy="${energy}"></i>
      </div>
   `);

})

$(document).on("click", ".remove", function () {
   keyref = $(this).attr("data-key");
   database.ref().child(keyref).remove();
   // window.location.reload();

   $(this).parent().remove();
});

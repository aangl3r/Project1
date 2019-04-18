// <!-- Much of this program was taken from https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/javascript -->


$('#submit').on('click', processImage);

var happiness;

function processImage() {
   // Replace <Subscription Key> with your valid subscription key.
   var subscriptionKey = "30e9de2d176e4777a961d0d067ec593e";
   var uriBase =
      "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

   // Request parameters.
   var params = {
      "returnFaceId": "false",
      "returnFaceLandmarks": "false",
      "returnFaceAttributes":
         "emotion"
   };
   // Display the image.
   var sourceImageUrl = $('#file-input').val();
   // console.log('***: processImage -> sourceImageUrl', sourceImageUrl);
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
			console.log('***: processImage -> happiness', happiness);
         $('.mood-name-1').html(`${topEmo}: ${parseInt(value * 10)} out of 10`);

         database.ref().push({
            sourceImageUrl,
            happiness,
            topEmo,
            value
         });
         $('#pic-1').attr('src', sourceImageUrl);
         console.log(data);
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
};
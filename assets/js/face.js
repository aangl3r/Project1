// <!-- Much of this program was taken from https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/javascript -->

$('#submit').on('click', processImage);

// The following snippet copied from Elnoor on Stack Overflow: https://stackoverflow.com/questions/43250263/bootstrap-4-file-input/43255741
$('.custom-file-input').on('change', function() { 
   let fileName = $(this).val().split('\\').pop(); 
   $(this).next('.custom-file-label').addClass("selected").html(fileName); 
});

function processImage() {
   // Replace <Subscription Key> with your valid subscription key.
   var subscriptionKey = "30e9de2d176e4777a961d0d067ec593e";
   // NOTE: You must use the same region in your REST call as you used to
   // obtain your subscription keys. For example, if you obtained your
   // subscription keys from westus, replace "westcentralus" in the URL
   // below with "westus".
   //
   // Free trial subscription keys are generated in the "westus" region.
   // If you use a free trial subscription key, you shouldn't need to change 
   // this region.
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
   var sourceImageUrl = $('.custom-file-input').val().replace(`C:\\fakepath\\WeddingPerformance1.PNG`, `https://i.pinimg.com/originals/ea/13/46/ea13460cd733ae74fe8e84516d5b2abb.jpg`);
   console.log('***: processImage -> sourceImageUrl', sourceImageUrl);
   
   $('#pic-1').attr('src', sourceImageUrl);
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
         // Show formatted JSON on webpage.
         $("#responseTextArea").val(JSON.stringify(data, null, 2));
         var anger = data[0].faceAttributes.emotion.anger;
         var contempt = data[0].faceAttributes.emotion.contempt;
         var disgust = data[0].faceAttributes.emotion.disgust;
         var fear = data[0].faceAttributes.emotion.happiness;
         var neutral = data[0].faceAttributes.emotion.neutral;
         var sadness = data[0].faceAttributes.emotion.sadness;
         var surprise = data[0].faceAttributes.emotion.surprise;

         $('.mood-name-1').text(`Anger: ${parseInt(anger) * 10} out of 10`);

         console.log(data
         );
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
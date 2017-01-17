var recognition = null;
var picture;
var params = {
    "visualFeatures": "Description",
    "language": "en",
};

var img_id;
$('#main-button').css('height', $('#main-button').css("width"));
document.addEventListener('deviceready', onDeviceReady, false);

function speak(text) {
    TTS.speak(text, function () {
    }, function (reason) {
        alert(reason);
    });

}

function onDeviceReady() {
    recognition = new SpeechRecognition();
    recognition.onresult = function (event) {
        if (event.results.length > 0) {
            //q.value = event.results[0][0].transcript;
            //q.form.submit();
            result = event.results[0][0].transcript.trim();
            if (result.toLowerCase() == "camera" || result.toLowerCase() == "open camera") {

                speak('Opening Camera!');
                CameraPreview.startCamera({ camera: "back", tapPhoto: true, previewDrag: false, toBack: false });
                return;
            }

            document.getElementById("main-status").innerHTML = event.results[0][0].transcript;

            console.log(img_id);
            $.post("http://vqa.daylen.com/api/upload_question", {
                'img_id': img_id,
                'question': event.results[0][0].transcript
            })
            .done(function (data) {
                $("#main-status").html(data['answer']);
                speak(data['answer']);
            })
            .fail(function (a, b, c) {
                alert(c);
            });
        }
    }
    CameraPreview.setOnPictureTakenHandler(function (result) {
        CameraPreview.stopCamera();
        speak("Processing. Please Wait");
        document.getElementById('loading-buzy').style.display = 'block';
        $.post('http://40.71.33.178/save', { data: result },
            function (data) {
                r = JSON.parse(data);
                ul = r['local'];
                img_id = r['img_id']
                console.log(JSON.stringify(r));
                $('#loading-buzy').css('display', 'none');
                $("#url").val("http://40.71.33.178/" + data);
                $.ajax({
                    url: "https://api.projectoxford.ai/vision/v1.0/analyze?" + $.param(params),
                    beforeSend: function (xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type", "application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "01e50a2eb00342d8bbdf1dc1744631a5");
                    },
                    type: "POST",
                    // Request body
                    data: "{'url':'" + "http://40.71.33.178/" + ul + "'}",
                })
                .done(function (data) {
                    console.log(JSON.stringify(data));
                    stext = data['description']['captions'][0]['text'];
                    stext = stext + ". The image also represents: "
                    var total = 0;
                    $.each(data['description']['tags'], function (i, tag) {
                        if (stext.indexOf(tag) < 0) {
                            stext = stext + tag + ", ";
                            total = total + 1;
                            if (total == 3) return false;
                        }
                    });
                    speak(stext);
                    //$('#main-status').html(data['description']['captions'][0]['text']);
                    $('#main-status').html(stext);

                    $.ajax({
                        url: "https://api.projectoxford.ai/vision/v1.0/ocr?",
                        beforeSend: function (xhrObj) {
                            // Request headers
                            xhrObj.setRequestHeader("Content-Type", "application/json");
                            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "01e50a2eb00342d8bbdf1dc1744631a5");
                        },
                        type: "POST",
                        // Request body
                        data: "{'url':'" + "http://40.71.33.178/" + ul + "'}",
                    })
                    .done(function (data) {
                        console.log("text reading complete");
                        console.log(JSON.stringify(data['regions']));
                        var final = "";
                        $.each(data['regions'], function (i, region) {
                            $.each(region['lines'], function (j, line) {
                                var temp = "";
                                $.each(line['words'], function (k, f) {
                                    temp = temp + f['text'] + " ";
                                });
                                if (final.length < temp.length) final = temp;
                            });

                        });
                        if (final.length > 5) {
                            setTimeout(function () {
                                speak("The image also contains the text: " + final);
                            }, 4500);

                        }
                        $('#text-status').html(data['regions'][0]['lines'][0]['words'][0]['text']);
                    })
                    .fail(function () {
                        alert("error");
                    });


                })
                .fail(function () {
                    alert("error");
                });

            });



    });
}
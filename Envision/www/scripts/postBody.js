
function makeRequest() {

}
$('#main-button').css('height', $('#main-button').css("width"));
$("#form").bind('ajax:complete', function () {

    alert("hola_senotira");


});
(function () {

    document.addEventListener("hold", function () {
        if (event.target.matches("#main-button")) {
            recognition.start();
        }
    });
    document.addEventListener("release", function () {
        if (event.target.matches("#main-button")) {
            recognition.stop();
        }
    });

    //document.getElementById("mainpage1").addEventListener('click', function (event) {
    //    speak("You are not taping in the right place. Please tap in the center.");
    //});
    document.getElementById("main-button").addEventListener("click", function (event) {
        event.preventDefault();
        speak('Opening Camera!')
        CameraPreview.startCamera({ camera: "back", tapPhoto: true, previewDrag: false, toBack: false });
    });

})();

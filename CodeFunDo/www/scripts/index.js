//// For an introduction to the Blank template, see the following documentation:
//// http://go.microsoft.com/fwlink/?LinkID=397704
//// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
//// and then run "window.location.reload()" in the JavaScript Console.
//(function () {
//    "use strict";

//    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

//    function onDeviceReady() {
//        // Handle the Cordova pause and resume events
//        document.addEventListener( 'pause', onPause.bind( this ), false );
//        document.addEventListener( 'resume', onResume.bind( this ), false );
        
//        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
//        var parentElement = document.getElementById('deviceready');
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//    };

//    function onPause() {
//        // TODO: This application has been suspended. Save application state here.
//    };

//    function onResume() {
//        // TODO: This application has been reactivated. Restore application state here.
//    };
//})();

var app = {
    startCamera: function () {
        CameraPreview.startCamera();
    },

    startCameraAnotherPos: function () {
        
    },

    stopCamera: function () {
        CameraPreview.stopCamera();
    },

    takePicture: function () {
        CameraPreview.takePicture({ maxWidth: window.device.width, maxHeight: window.device.height });
    },

    switchCamera: function () {
        CameraPreview.switchCamera();
    },

    show: function () {
        CameraPreview.show();
    },

    hide: function () {
        CameraPreview.hide();
    },

    colorEffectChanged: function () {
        var effect = document.getElementById('colorEffectCombo').value;
        CameraPreview.setColorEffect(effect);
    },

    init: function () {
        document.getElementById('startCameraButton').addEventListener('click', this.startCamera, false);
        document.getElementById('startCameraAnotherPosButton').addEventListener('click', this.startCameraAnotherPos, false);

        document.getElementById('stopCameraButton').addEventListener('click', this.stopCamera, false);
        document.getElementById('takePictureButton').addEventListener('click', this.takePicture, false);
        document.getElementById('switchCameraButton').addEventListener('click', this.switchCamera, false);
        document.getElementById('showButton').addEventListener('click', this.show, false);
        document.getElementById('hideButton').addEventListener('click', this.hide, false);
        document.getElementById('colorEffectCombo').addEventListener('change', this.colorEffectChanged, false);
        //window.addEventListener('orientationchange', this.onStopCamera, false);

    }
};

document.addEventListener('deviceready', function () {
    
}, false);
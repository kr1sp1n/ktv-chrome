var session = false;

var onRequestSessionSuccess = function(e) {
  console.log('onRequestSessionSuccess');
  console.log(e);
};

var onLaunchError = function(err) {
  console.log('onLaunchError');
  console.log(err);
};

var launchApp = function() {
  console.log("launching app...");
  chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
};

var sessionListener = function(e) {
  session = e;
  console.log('Session Listener');
};

var receiverListener = function(e) {
  console.log('Receiver Listener');
  if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log('Receiver available');
  }
};

var onInitSuccess = function(x) {
  console.log('onInitSuccess');
};

var onError = function(x) {
  console.log('onError');
};

var initializeCastApi = function() {
  var appId = '13A0EA72'
  //var appId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
  var sessionRequest = new chrome.cast.SessionRequest(appId);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);

};

window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
};
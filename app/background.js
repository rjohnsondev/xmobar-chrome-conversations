var port = null;

function sendNativeMessage(msg) {
  if (port) {
    port.postMessage(msg);
    console.log("Sent message: <b>" + msg + "</b>");
  } else {
    console.log("not connected: <b>" + msg + "</b>");
  }
}

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
}

function connect() {
  var hostName = "com.hipchat";
  console.log("Connecting to native messaging host <b>" + hostName + "</b>")
  port = chrome.runtime.connectNative(hostName);
  port.onDisconnect.addListener(onDisconnected);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    c = request.conversationCount;
    if (c == 0) {
      sendNativeMessage("all conversations read");
    } else {
      sendNativeMessage("<fc=#6666FF>" + c + " unread conversation(s)</fc>");
    }
  });

connect();
console.log("Background js loaded");

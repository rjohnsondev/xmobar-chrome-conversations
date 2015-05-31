setInterval(function(){ 
  c = document.getElementsByClassName('hc-mention').length
  chrome.runtime.sendMessage(
    {
      conversationCount: c
    },
    function(response) {
      console.log(response);
    });
}, 2000);


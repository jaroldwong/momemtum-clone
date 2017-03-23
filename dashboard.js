chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({'url': chrome.extension.getURL('dashboard.html')});
});

var clockDisplay = document.getElementById('clock');
function updateClock() {
    var d = new Date(),
        hours = d.getHours(),
        minutes = d.getMinutes();

    clockDisplay.innerHTML = hours + ":" + minutes;
}

window.onload = updateClock;
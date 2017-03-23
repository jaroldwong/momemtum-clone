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

function getWeather() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + mapsAPIKey;
        
        // JSON request
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        
        request.onload = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                var city = data["results"][2]["address_components"][1]["long_name"]
                
                document.getElementById("weather").innerHTML = city;
            } else {
                document.getElementById("weather").innerHTML = "Location Error";
            }
        }

        request.send();
    });
}

window.onload = function() {
    updateClock();
    getWeather();
}
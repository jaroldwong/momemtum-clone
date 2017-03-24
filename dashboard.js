chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({'url': chrome.extension.getURL('dashboard.html')});
});

var clockDisplay = document.getElementById('clock');
var weatherDisplay = document.getElementById('weather');
var quoteDisplay = document.getElementById('quote');

function updateClock() {
    var d = new Date(),
        hours = d.getHours(),
        minutes = d.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (hours === 0) {
        hours = 12;
    }
    
    if (hours > 12) {
        hours -= 12;
    }

    clockDisplay.innerHTML = hours + ":" + minutes;
}

function getWeather() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" + latitude + "%2C" + longitude + ")%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

        // JSON request
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send();

        request.onload = function() {
            if (request.readyState === 4 && request.status === 200) {
                var data = JSON.parse(request.responseText);
                var city = data.query.results.channel.location.city;
                var temp = data.query.results.channel.item.condition.temp;
                var condition = data.query.results.channel.item.condition.text;
                var weatherString = temp + "&deg;" + "<br>" + city;

                weatherDisplay.innerHTML = weatherString;
            } else {
                weatherDisplay.innerHTML = "Location Error";
            }
        };
    });
}

function getQuote() {
    var url = "http://quotes.rest/qod.json?category=inspire";

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();

    request.onload = function() {
        if (request.readyState === 4 && request.status === 200) {
            var data = JSON.parse(request.responseText);
            var quote = data.contents.quotes[0].quote;
            var author = data.contents.quotes[0].author;
            
            quoteDisplay.innerHTML = "\"" + quote + "\"";
        } else {
            quoteDisplay.innerHTML = "Quote Error";
        }
    };
}

window.onload = function() {
    updateClock();
    getWeather();
    getQuote();
};
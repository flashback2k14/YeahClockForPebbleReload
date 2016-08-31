/**
 * require modules
 */
var api = require("./api");
var url = require("./url");

/**
 * send message to rocky/index.js
 * @param data - weather data
 */
function _messagePost (data) {
  Pebble.postMessage({
    weather: {
      celsius : Math.round(data.main.temp - 273.15),
      fahrenheit: Math.round((data.main.temp - 273.15) * 9 / 5 + 32),
      desc: data.weather[0].main
    }
  });
}

/**
 * receive messages from rocky/index.js
 */
Pebble.on("message", function (event) {
  // get message data
  var msg = event.data;
  // check if fetch is available
  if (msg.fetch) {
    // get location data from phone
    navigator.geolocation.getCurrentPosition(function (pos) {
      // send api call and handle response
      api.request(url.build(pos), "GET",
                  function (error, response) {
                    // show error message
                    if (error) {
                      console.error(JSON.stringify(error));
                      return;
                    }
                    // send weather data
                    _messagePost(response);
                  });
    }, function (err) {
      // show error message
      console.error(JSON.stringify(err));
    }, {
      //location settings
      timeout: 15000,
      maximumAge: 60000
    });
  }
});

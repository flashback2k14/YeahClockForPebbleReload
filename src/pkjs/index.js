/**
 * require modules
 */
var api = require("./api");
var url = require("./url");
// clay settings page
var Clay = require("./clay");
var config = require("./config");
var clay = new Clay(config, null, { autoHandleEvents: false });

/**
 * send message to rocky/index.js
 * @param data - setting data
 */
function _messagePostSettings (data) {
	Pebble.postMessage({settings: data});
}

/**
 * send message to rocky/index.js
 * @param data - weather data
 */
function _messagePostWeather (data) {
  Pebble.postMessage({
    weather: {
      celsius : Math.round(data.main.temp - 273.15),
      fahrenheit: Math.round((data.main.temp - 273.15) * 9 / 5 + 32),
      desc: data.weather[0].main
    }
  });
}

/**
 * handle requested settings call
 */
function _handleRestoreSettingsRequest () {
	// Restore settings from localStorage and send to watch
  var settings = JSON.parse(localStorage.getItem("clay-settings"));
  if (settings) {
		_messagePostSettings(settings);
  }
}

/**
 * handle requested weather api call
 */
function _handleWeatherFetchRequest () {
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
									_messagePostWeather(response);
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

/**
 * open confige page
 */
function _openConfigPage () {
	Pebble.openURL(clay.generateUrl());
}

/**
 * fired if pebble is ready
 */
Pebble.addEventListener("ready", function (e) {
	_openConfigPage();
  _handleRestoreSettingsRequest();
});

/**
 * open settings page
 */
Pebble.addEventListener("showConfiguration", function (e) {
  _openConfigPage();
});

/**
 * handle settings from the user
 */
Pebble.addEventListener("webviewclosed", function (e) {
  if (e && !e.response) {
    return;
  }
		
	// Return settings from Config Page to watch
  var settings = clay.getSettings(e.response, false);
		
  // Flatten to match localStorage version
  var settingsFlat = {};
  Object.keys(settings).forEach(function (key) {
    if (typeof settings[key] === 'object' && settings[key]) {
      settingsFlat[key] = settings[key].value;
    } else {
      settingsFlat[key] = settings[key];
    }
  });
	
	// send settings to rocky/index.js
  _messagePostSettings(settingsFlat);
});

/**
 * receive messages from rocky/index.js
 */
Pebble.on("message", function (event) {
  // get message data
  var msg = event.data;
	// check if settings is available
	if (msg.settings) {
		_handleRestoreSettingsRequest();
	}
  // check if fetch is available
  if (msg.fetch) {
    _handleWeatherFetchRequest();
  }
});

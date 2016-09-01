/**
 * require modules
 */
var rocky = require("rocky");
var watchface = require("./watchface");

/**
 * init variables
 */
var SWITCHTIME = 10;
var FETCHTIME = 4;
var isFirstRun = true;
var shouldSwitch = false;
var settingData = null;
var weatherData = null;

/**
 * render watchface
 */
rocky.on("draw", function (e) {
	// init watchface
	watchface.init(e, shouldSwitch, settingData, weatherData);
	// render watchface
	watchface.render();
	// reset switch flag
	if (shouldSwitch) {
		shouldSwitch = false;
	}
});

/**
 * call render watchface each minute
 */
rocky.on("minutechange", function (e) {
	// get callback date
	var cbDate = new Date(e.date);
	// check if first run
	//   --> call settings
	//   --> call weather api
  if (isFirstRun) {
		rocky.postMessage({ 
			settings: true, 
			fetch: true 
		});
    isFirstRun = false;
  }
	// check minutes if even --> set switch flag
	if (cbDate.getMinutes() % SWITCHTIME === 0) {
		shouldSwitch = true;		
	}
	// call on-draw
  rocky.requestDraw();
});

/**
 * call request weather data each 4 hours
 */
rocky.on("hourchange", function (e) {
	// only call weather api if middle row is rendered
	if (settingData && !settingData.hideMiddleRow) {
		// get callback date
		var cbDate = new Date(e.date);
		// check if hours mod 4 equals 0 
		if (cbDate.getHours() % FETCHTIME === 0) {
			rocky.postMessage({ fetch: true });
		}
	}
});

/**
 * receive messages from pkjs/index.js
 */
rocky.on("message", function (event) {
  // get message data from event
  var msg = event.data;
	// check if setting data is available
	if (msg.settings) {
		// set setting data
		settingData = msg.settings;
		// call redraw
		rocky.requestDraw();
	}
  // check if weather data is available
  if (msg.weather) {
    // set weather data
    weatherData = msg.weather;
  }  
});

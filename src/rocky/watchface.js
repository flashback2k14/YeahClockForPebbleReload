/**
 * declare global module variables
 */
var _ctx;
var _shouldSwitch;
var _settingData;
var _weatherData;

/**
 * constants
 */
var DISPLAYHEIGHT = 168;

/**
 * helper function to add leading zero
 * @param number - hour | minute
 * @return number [String]
 */
function _addZero (number) {
	if (number < 10) {
		return "0" + number;
	}
	return number;
}

/**
 * add leading zeros to create valid hex color code
 * @param color - color
 * @return color [String]
 */
function _padColorString (color) {
  var tColor = color.toLowerCase();
  while (tColor.length < 6) {
    tColor = "0" + tColor;
  }
  return tColor;
}

/**
 * create css hex color code 
 * @param color - color
 * @return color [String]
 */
function _createCssColor (color) {
  if (typeof color === "number") {
    color = color.toString(16);
  } else if (!color) {
    return "transparent";
  }
  return "#" + _padColorString(color);
}

/**
 * get color from settings or set default color
 * @param type - foreground | background
 * @return color [String]
 */
function _getColor (type) {
	switch (type) {
		case "foreground":
			return _settingData && _settingData.hasOwnProperty("foregroundColor") ? 
									_createCssColor(_settingData.foregroundColor) : 
									"white";
		case "background":
			return _settingData && _settingData.hasOwnProperty("backgroundColor") ? 
									_createCssColor(_settingData.backgroundColor) : 
									"black";
		default:
			return "white";
	}
}

/**
 * get hideMiddleRow value from settings or set default value
 * @return value [Boolean]
 */
function _isMiddleRowHidden () {
	return _settingData && _settingData.hasOwnProperty("hideMiddleRow") ? 
									_settingData.hideMiddleRow : 
									false;
}

/**
 * get temperature type value from settings or set default value
 * @return temperature type [String]
 */
function _getTemperatureType () {
	return _settingData && _settingData.hasOwnProperty("temperatureType") ? 
									_settingData.temperatureType : 
									"celsius";
}

/**
 * render function for background
 */ 
function _renderBackground () {
	_ctx.fillStyle = _getColor("background");
  _ctx.fillRect(0, 0, _ctx.canvas.clientWidth, _ctx.canvas.clientHeight);
}

/**
 * render function for time
 * @param dt - current dateTime
 * @param wDisp - unobstructedWidth from canvas
 * @param isQuickView - switch layout on quick view
 */
function _renderTime (dt, wDisp, isQuickView) {
	// define clock style
	_ctx.fillStyle = _getColor("foreground");
  _ctx.textAlign = "center";
  _ctx.font = "49px Roboto-subset";
  // get time
  var hour = dt.getHours();
	var min  = dt.getMinutes();
	// define clock position
  var posX = wDisp / 2;
	// check if Quick View is visible 
	if (isQuickView) {
		// draw clock
		_ctx.fillText(_addZero(hour), 42, 25, wDisp);
		_ctx.fillText(_addZero(min), 100, 25, wDisp);
	} else {
		// check if middle row is hiddens
		if (_isMiddleRowHidden()) {
			// draw clock
			_ctx.fillText(_addZero(hour), posX, 35, wDisp);
			_ctx.fillText(_addZero(min), posX, 75, wDisp);
		} else {
			// draw clock
			_ctx.fillText(_addZero(hour), posX, 10, wDisp);
			_ctx.fillText(_addZero(min), posX, 100, wDisp);	
		}
	}
}

/**
 * render function for date
 * @param dt - current dateTime
 * @param hDisp - unobstructedHeigth from canvas
 * @param wDisp - unobstructedWidth from canvas
 * @param isQuickView - switch layout on quick view
 */
function _renderDate (dt, hDisp, wDisp, isQuickView) {
	// define date style
	_ctx.fillStyle = _getColor("foreground");
	_ctx.textAlign = "center";
	_ctx.font = "21px Roboto";
	// get date
	var date = _addZero(dt.getDate()) + "." + _addZero(dt.getMonth() + 1) + "." + dt.getFullYear();
	var dateDimens = _ctx.measureText(date);
	var posY = (hDisp / 2) - (dateDimens.height / 2);
	// draw date
	if (isQuickView) {
		_ctx.fillText(date, (wDisp / 2), 80, wDisp);	
	} else {
		_ctx.fillText(date, (wDisp / 2), posY, wDisp);		
	}
}

/**
 * render function for weather
 * @param hDisp - unobstructedHeigth from canvas
 * @param wDisp - unobstructedWidth from canvas
 * @param isQuickView - switch layout on quick view
 */
function _renderWeather (hDisp, wDisp, isQuickView) {
  // define date style
	_ctx.fillStyle = _getColor("foreground");
	_ctx.textAlign = "center";
	_ctx.font = "21px Roboto";
	// get weather text
	var wString = "";
	if (_getTemperatureType() === "celsius") {
		wString = _weatherData.celsius + "°C, " + _weatherData.desc;
	} else {
		wString = _weatherData.fahrenheit + "°F, " + _weatherData.desc;
	}		
	var wsDimens = _ctx.measureText(wString);
	var posY = (hDisp / 2) - (wsDimens.height / 2);
	// draw weather
	if (isQuickView) {
		_ctx.fillText(wString, (wDisp / 2), 80, wDisp);
	} else {
		_ctx.fillText(wString, (wDisp / 2), posY, wDisp);	
	}
}

/**
 * render function for complete watchface
 * @param dt - current dateTime
 * @param hDisp - unobstructedHeigth from canvas
 * @param wDisp - unobstructedWidth from canvas
 * @param isQuickView - switch layout on quick view
 */
function _renderWatchface (dt, hDisp, wDisp, isQuickview) {
	// render time
	_renderTime(dt, wDisp, isQuickview);	
	// render weather or date	
	if (!_isMiddleRowHidden()) {
		if (_shouldSwitch && _weatherData) {
			_renderWeather(hDisp, wDisp, isQuickview);
		} else {
			_renderDate(dt, hDisp, wDisp, isQuickview);
		}
	}
}

/**
 * init global variables
 * @param e - RockyDrawCallback (CanvasRenderingContext2D)
 * @param shouldSwitch - flag to switch middle row
 * @param settingData - setting data
 * @param weatherData - weather data
 */
function initVariables (e, shouldSwitch, settingData, weatherData) {
	_ctx = e.context;
	_shouldSwitch = shouldSwitch;
	_settingData = settingData;
	_weatherData = weatherData;
}

/**
 * render watchface
 */
function createWatchface () {
	// clear screen
  _ctx.clearRect(0, 0, _ctx.canvas.clientWidth, _ctx.canvas.clientHeight);
  // get display dimensions
  var wDisplay = _ctx.canvas.unobstructedWidth;
	var hDisplay = _ctx.canvas.unobstructedHeight;
  // get current datetime
  var currentDateTime = new Date();
	// render background
	_renderBackground();
	// check if quick view is visible
	if (hDisplay === DISPLAYHEIGHT) {
		_renderWatchface(currentDateTime, hDisplay, wDisplay, false);
	} else {
		_renderWatchface(currentDateTime, hDisplay, wDisplay, true);
	}
}

/**
 * export functions to the outside
 */
module.exports = {
	init   : initVariables,
	create : createWatchface
};
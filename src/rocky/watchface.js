/**
 * declare global module variables
 */
var _ctx;
var _shouldSwitch;
var _weatherData;

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
 * render function for time
 * @param ctx - Context
 * @param dt - current dateTime
 * @param wDisp - unobstructedWidth from canvas
 */
function _renderTime (ctx, dt, wDisp) {
	// define clock style
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "49px Roboto-subset";
  // get time
  var hour = dt.getHours();
	var min  = dt.getMinutes();
	// define clock position
  var posX = wDisp / 2;
  // draw clock
  ctx.fillText(_addZero(hour), posX, 10, wDisp);
	ctx.fillText(_addZero(min), posX, 100, wDisp);
}

/**
 * render function for date
 * @param ctx - Context
 * @param dt - current dateTime
 * @param hDisp - unobstructedHeigth from canvas
 * @param wDisp - unobstructedWidth from canvas
 */
function _renderDate (ctx, dt, hDisp, wDisp) {
	// define date style
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = "21px Roboto";
	// get date
	var date = _addZero(dt.getDate()) + "." + _addZero(dt.getMonth() + 1) + "." + dt.getFullYear();
	var dateDimens = ctx.measureText(date);
	var posY = (hDisp / 2) - (dateDimens.height / 2);
	// draw date
	ctx.fillText(date, (wDisp / 2), posY, wDisp);	
}

/**
 * render function for weather
 * @param ctx - Context
 * @param wData - weather data
 * @param hDisp - unobstructedHeigth from canvas
 * @param wDisp - unobstructedWidth from canvas
 */
function _renderWeather (ctx, wData, hDisp, wDisp) {
  // define date style
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = "21px Roboto";
	//
	var wString = wData.celsius + "°C, " + wData.desc;
	var wsDimens = ctx.measureText(wString);
	var posY = (hDisp / 2) - (wsDimens.height / 2);
	// draw date
	ctx.fillText(wString, (wDisp / 2), posY, wDisp);
}

/**
 * init global variables
 * @param e - RockyDrawCallback (CanvasRenderingContext2D)
 * @param shouldSwitch - flag to switch middle row
 * @param weatherData - weather data
 */
function initVariables (e, shouldSwitch, weatherData) {
	_ctx = e.context;
	_shouldSwitch = shouldSwitch;
	_weatherData = weatherData;
}

/**
 * render watchface
 */
function renderWatchface () {
	// clear screen
  _ctx.clearRect(0, 0, _ctx.canvas.clientWidth, _ctx.canvas.clientHeight);
  // get display dimensions
  var wDisplay = _ctx.canvas.unobstructedWidth;
	var hDisplay = _ctx.canvas.unobstructedHeight;
  // get current datetime
  var currentDateTime = new Date();
  // render time
	_renderTime(_ctx, currentDateTime, wDisplay);
	// render weather or date
	if (_shouldSwitch && _weatherData) {
		_renderWeather(_ctx, _weatherData, hDisplay, wDisplay);
	} else {
		_renderDate(_ctx, currentDateTime, hDisplay, wDisplay);
	}
}

/**
 * export functions to the outside
 */
module.exports = {
	init   : initVariables,
	render : renderWatchface
};
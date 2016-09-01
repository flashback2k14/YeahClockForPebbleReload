/**
 * global module variable
 */
var _apiKey = "#########################";

/**
 * build api url
 * @param pos - location data
 * @return url [String]
 */
function builder (pos) {
  return "http://api.openweathermap.org/data/2.5/weather"  +
                            "?lat=" + pos.coords.latitude  +
                            "&lon=" + pos.coords.longitude +
                            "&appid=" + _apiKey;
}

/**
 * export function to the outside
 */
module.exports.build = builder;
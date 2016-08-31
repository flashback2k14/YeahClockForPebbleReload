/**
 * request given api url
 * @param url - api url
 * @param type - request method
 * @param callback - function (error, data)
 */
function request (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(null, JSON.parse(this.responseText));
  };
  xhr.onerror = function () {
    callback(new Error("request failed!", null));
  };
  xhr.open(type, url);
  xhr.send();
}

/**
 * export function to the outside
 */
module.exports.request = request;
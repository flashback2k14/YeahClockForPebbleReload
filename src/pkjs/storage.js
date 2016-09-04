/**
 * function to check if item exists
 * @param key - item key
 * @return value [Boolean]
 */
function exist (key) {
	return localStorage.getItem(key) ? true : false;
}

/**
 * function to get item from key
 * @param key - item key
 * @return value [Boolean | String | Number]
 */
function get (key) {
	return localStorage.getItem(key);
}

/**
 * function to save item
 * @param key - item key
 * @param value - item value
 */
function save (key, value) {
	localStorage.setItem(key, value);
}

/**
 * export function to the outside
 */
module.exports = {
	exist : exist,
	get		: get,
	save	: save
};
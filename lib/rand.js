/**
 * Randomly generate an integer.
 * @param {number} min
 * @param {number} max
 * @returns {number} A randomly generated number between min and max - 1.
 */
module.exports = function(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;

}
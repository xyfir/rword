const rand = require('./rand');

/**
 * Shuffle the words array in place.
 * @param {string[]} words - The words array to shuffle.
 */
module.exports = function(words) {

  let i = 0, j = 0, temp;

  for (i = words.length - 1; i > 0; i -= 1) {
    j = rand(0, i + 1);

    temp = words[i], words[i] = words[j], words[j] = temp;
  }

}
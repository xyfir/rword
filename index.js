const generateIndexes = require('./lib/generate-indexes');
const shuffleWords = require('./lib/shuffle-words');

let words = [];
let globalPool = [];

class rword {
  /**
   * @typedef {object} Length
   * @prop {number} [exactly]
   * @prop {number} [start]
   * @prop {number} [end]
   */
  /**
   * @typedef {object} GenerateOptions
   * @prop {RegExp} [contains] - A regular expression that a word
   *  must match for it to have a chance of being randomly chosen.
   * @prop {string|number|Length} [length] - A length or range of
   *  lengths that a word must match for it to have a chance of being randomly
   *  chosen. Is converted to an object internally.
   * @prop {string} [capitalize] - `'none' | 'first' | 'all'` Determines the
   *  capitalization of the randomly chosen words.
   */
  /**
   * Randomly generates words from the words array.
   * @param {number} [count] - The maximum number of matching words to return.
   * @param {GenerateOptions} [opt] - An options object for filtering and
   *  output modification.
   * @return {string|string[]} A string if count is `1` and an array of strings
   *  if greater than one.
   */
  static generate(count = 1, opt) {
    opt = Object.assign(
      {
        contains: /.*/,
        length: '3-10',
        capitalize: 'none'
      },
      opt
    );

    // Convert opt.length to an object
    if (typeof opt.length == 'string' && opt.length.indexOf('-') > -1) {
      opt.length = opt.length.split('-');

      opt.length = {
        start: +opt.length[0],
        end: +opt.length[1]
      };
    }
    // Convert number or string number ('5') to an object
    else if (typeof opt.length != 'object') {
      opt.length = {
        exactly: +opt.length
      };
    }

    // Convert opt.contains to a regular expression
    if (typeof opt.contains == 'string')
      opt.contains = new RegExp(opt.contains);

    let pool = [];

    // Skip filtering if possible
    if (
      opt.contains == '/.*/' &&
      opt.length.start == 3 &&
      opt.length.end == 10
    ) {
      pool = words;
    }
    // Filter out unwanted words
    else {
      pool = words.filter(word => {
        // Filter out words that don't match length
        if (opt.length.exactly) {
          if (word.length != opt.length.exactly) return false;
        } else {
          if (word.length < opt.length.start || word.length > opt.length.end)
            return false;
        }

        // Filter out words that don't contain regex
        if (opt.contains) return opt.contains.test(word);
        else return true;
      });
    }

    // No matches
    if (!pool.length) return count == 1 ? '' : [];

    // Generate indexes for words to return
    const indexes = generateIndexes(pool.length, count);
    const temp = [];

    // Select words by index
    indexes.forEach(index => temp.push(pool[index]));
    pool = temp;

    // Capitalize words
    switch (opt.capitalize) {
      case 'all':
        pool = pool.map(w => w.toUpperCase());
        break;
      case 'first':
        pool = pool.map(w => w[0].toUpperCase() + w.slice(1));
        break;
    }

    // Returns string or array of strings
    return count == 1 ? pool[0] : pool;
  }

  /** Shuffles words and globalPool arrays. */
  static shuffle() {
    shuffleWords(words);
    shuffleWords(globalPool);
  }

  /**
   * A simple generator that pulls words from a prefilled global pool. Should
   *  be preferred over `rword.generate()` if custom filters are not needed as
   *  this method can in certain instances be many times faster.
   * @param {number} [count] - How many words to return. Will throw an error
   *  if greater than `10`.
   * @return {string|string[]} A string if count is `1` and an array of strings
   *  if greater than one.
   * @throws {string}
   */
  static generateFromPool(count = 1) {
    if (count > 10) throw 'Too many words requested. Use rword.generate().';

    // Fill globalPool
    if (count > globalPool.length) globalPool = this.generate(500);

    const pool = globalPool.splice(0, count);

    return count == 1 ? pool[0] : pool;
  }
}

// Populate words[] for the first time
if (!words.length) {
  words = require('./words/english');
  rword.shuffle();
}

module.exports = rword;

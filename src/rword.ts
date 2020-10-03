import { generateIndexes } from './lib/generate-indexes';
import { shuffleWords } from './lib/shuffle-words';

let words: string[] = [];

export interface GenerateOptions {
  /**
   * A length or range of lengths that a word must match for it to have a
   *  chance of being randomly chosen
   * @example 5
   * @example "3-10"
   */
  length?: string | number;
  /**
   * Regex words must match to have a chance of being randomly chosen
   * @example "word"
   * @example /ing$/
   */
  contains?: RegExp | string;
  /**
   * Sets the capitalization of the randomly chosen words
   */
  capitalize?: 'none' | 'first' | 'all';
}

export class rword {
  static globalPool: string[] = [];

  static get words(): string[] {
    return words;
  }

  /**
   * Randomly generates words from the words array
   */
  static generate(count: number = 1, opt?: GenerateOptions): string | string[] {
    opt = Object.assign(
      {
        contains: /.*/,
        length: '3-10',
        capitalize: 'none',
      },
      opt
    );

    let length: { exactly?: number; start?: number; end?: number } = {};
    const contains =
      typeof opt.contains == 'string'
        ? new RegExp(opt.contains)
        : (opt.contains as RegExp);

    // Convert opt.length to an object
    // From string
    if (typeof opt.length == 'string') {
      if (opt.length.indexOf('-') > -1) {
        const [start, end] = opt.length.split('-').map(Number);
        length = { start, end };
      } else {
        opt.length = +opt.length;
      }
    }
    // From number
    if (typeof opt.length == 'number') {
      length = { exactly: opt.length };
    }

    let pool: string[] = [];

    // Skip filtering if possible
    if (
      contains.toString() == '/.*/' &&
      length.start == 3 &&
      length.end == 10
    ) {
      pool = words;
    }
    // Filter out unwanted words
    else {
      pool = words.filter((word) => {
        // Filter out words that don't match length
        if (length.exactly) {
          if (word.length != length.exactly) return false;
        } else {
          if (
            word.length < (length.start as number) ||
            word.length > (length.end as number)
          )
            return false;
        }

        // Filter out words that don't contain regex
        if (contains) return contains.test(word);
        else return true;
      });
    }

    // No matches
    if (!pool.length) return count == 1 ? '' : [];

    // Generate indexes for words to return
    const indexes = generateIndexes(pool.length, count);
    const temp: string[] = [];

    // Select words by index
    indexes.forEach((index) => temp.push(pool[index]));
    pool = temp;

    // Capitalize words
    switch (opt.capitalize) {
      case 'all':
        pool = pool.map((w) => w.toUpperCase());
        break;
      case 'first':
        pool = pool.map((w) => w[0].toUpperCase() + w.slice(1));
        break;
    }

    // Returns string or array of strings
    return count == 1 ? pool[0] : pool;
  }

  /**
   * A simple generator that pulls words from a prefilled global pool. Should
   *  be preferred over `rword.generate()` if custom filters are not needed as
   *  this method can in certain instances be many times faster.
   * @param count - Words to return. Throws error if greater than `10`
   */
  static generateFromPool(count: number = 1): string | string[] {
    if (count > 10) throw 'Too many words requested. Use rword.generate().';

    // Fill globalPool
    if (count > rword.globalPool.length)
      rword.globalPool = rword.generate(500) as string[];

    const pool = rword.globalPool.splice(0, count);

    return count == 1 ? pool[0] : pool;
  }

  /**
   * Shuffles words and globalPool arrays
   */
  static shuffle(): void {
    shuffleWords(words);
    shuffleWords(rword.globalPool);
  }

  /**
   * Load and shuffle word list
   */
  static load(list: 'big' | 'small') {
    if (list === 'small') {
      words = require('../words/small.json');
    } else {
      words = require('../words/big.json');
    }
    rword.shuffle();
  }
}

rword.load('small');

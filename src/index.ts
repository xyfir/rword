import { generateIndexes } from './lib/generate-indexes';
import { shuffleWords } from './lib/shuffle-words';
import { words } from './words/english';

/** An options object for filtering and output modification */
interface GenerateOptions {
  /**  Regex words must match to have a chance of being randomly chosen */
  contains?: RegExp;
  /**
   * A length or range of lengths that a word must match for it to have a
   *  chance of being randomly chosen
   */
  length?: string | number;
  /** Determines the capitalization of the randomly chosen words */
  capitalize: 'none' | 'first' | 'all';
}

export class rword {
  static globalPool: string[] = [];

  /** Randomly generates words from the words array. */
  static generate(count: number = 1, opt?: GenerateOptions): string | string[] {
    opt = Object.assign(
      {
        contains: /.*/,
        length: '3-10',
        capitalize: 'none'
      },
      opt
    );

    let length: { exactly?: number; start?: number; end?: number } = {};

    // Convert opt.length to an object
    if (typeof opt.length == 'string' && opt.length.indexOf('-') > -1) {
      const l = opt.length.split('-');
      length = { start: +l[0], end: +l[1] };
    }
    // Convert number or string number ('5') to an object
    else if (typeof opt.length != 'object') {
      length = { exactly: +opt.length };
    }

    // Convert opt.contains to a regular expression
    if (typeof opt.contains == 'string')
      opt.contains = new RegExp(opt.contains);

    let pool = [];

    // Skip filtering if possible
    if (
      opt.contains.toString() == '/.*/' &&
      length.start == 3 &&
      length.end == 10
    ) {
      pool = words;
    }
    // Filter out unwanted words
    else {
      pool = words.filter(word => {
        // Filter out words that don't match length
        if (length.exactly) {
          if (word.length != length.exactly) return false;
        } else {
          if (word.length < length.start || word.length > length.end)
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
  static shuffle(): void {
    shuffleWords(words);
    shuffleWords(rword.globalPool);
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
      rword.globalPool = this.generate(500) as string[];

    const pool = rword.globalPool.splice(0, count);

    return count == 1 ? pool[0] : pool;
  }
}

// Populate words[] for the first time
if (!words.length) rword.shuffle();

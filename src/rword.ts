import { generateIndexes } from './lib/generate-indexes.js';
import { promises as fs } from 'fs';
import { shuffleWords } from './lib/shuffle-words.js';
import path from 'path';

let words: string[] = [];

export class rword {
  static get words(): string[] {
    return words;
  }

  /**
   * Randomly generates words from the words array
   */
  static generate(count: number = 1): string | string[] {
    const pool = words;
    const indexes = generateIndexes(pool.length, count);
    const temp: string[] = [];
    indexes.forEach((index: number) => temp.push(pool[index]));
    return count == 1 ? temp[0] : temp;
  }

  /**
   * Shuffles words and globalPool arrays
   */
  static shuffle(): void {
    shuffleWords(words);
  }

  /**
   * Load and shuffle word list
   */
  static async load(list: 'big' | 'small') {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, `../words/${list}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    words = JSON.parse(data);
    rword.shuffle();
  }
}

rword.load('small');

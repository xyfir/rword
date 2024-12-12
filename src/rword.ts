import { promises as fs } from 'fs';
import { Random } from './Random.js';
import path from 'path';

let words: string[] = [];

export class Rword {
  static get words(): string[] {
    return words;
  }

  /**
   * Randomly generates words from the words array
   */
  static generate(count: number = 1): string[] {
    return Random.indexes(words.length, count).map((i) => words[i]);
  }

  /**
   * Shuffles words and globalPool arrays
   */
  static shuffle(): void {
    Random.shuffle(words);
  }

  /**
   * Load and shuffle word list
   */
  static async load(list: 'big' | 'small') {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, `../words/${list}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    words = JSON.parse(data);
    Rword.shuffle();
  }
}

Rword.load('small');

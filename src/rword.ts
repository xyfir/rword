import { Random } from './Random.js';
import path from 'path';
import fs from 'fs';

let words: string[] = [];

export class Rword {
  static get words(): string[] {
    return words;
  }

  /**
   * Randomly generates words from the words array
   */
  static generate(count: number = 1): string[] {
    return count
      ? Random.indexes(words.length, count).map((i) => words[i])
      : [];
  }

  /**
   * Shuffles words array
   */
  static shuffle(): void {
    Random.shuffle(words);
  }

  /**
   * Load and shuffle word list
   */
  static load(list: 'big' | 'small'): void {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, `../words/${list}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    words = JSON.parse(data);
    Rword.shuffle();
  }
}

Rword.load('small');

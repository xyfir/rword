import { Random } from './Random.js';
import path from 'path';
import fs from 'fs';

export class Rword {
  private words: string[];
  private seed: number | undefined;

  constructor(list: 'big' | 'small', seed?: number) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, `../words/${list}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    this.words = JSON.parse(data);
    this.seed = seed;

    if (!this.seed) this.shuffle();
  }

  private seededRandom(): number {
    if (!this.seed) return Math.random();

    // Xorshift algorithm constants
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;

    // Ensure the result is a positive number and normalize
    return (this.seed >>> 0) / 2 ** 32;
  }

  getWords(): string[] {
    return this.words;
  }

  generate(count: number = 1): string[] {
    return count
      ? Array.from(
          { length: count },
          () => this.words[Math.floor(this.seededRandom() * this.words.length)]
        )
      : [];
  }

  shuffle(): void {
    Random.shuffle(this.words);
  }
}

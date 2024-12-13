import { Random } from './Random.js';
import path from 'path';
import fs from 'fs';

export class Rword {
  private generations = 0;
  private seedChars: number[] | undefined;
  private words: string[];

  constructor(list: 'big' | 'small', seed?: string) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, `../words/${list}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    this.words = JSON.parse(data);

    this.seedChars = seed
      ? Array.from(seed).map((c) => c.charCodeAt(0))
      : undefined;

    if (!seed) this.shuffle();
  }

  private seededRandom(): number {
    let hash = 0;
    for (let i = 0; i < this.seedChars!.length; i++) {
      const charCode = this.seedChars![i];
      hash = (hash << 5) - hash + charCode + this.generations++;
      hash &= hash; // Convert to 32bit integer
    }

    // Xorshift algorithm constants
    hash ^= hash << 13;
    hash ^= hash >> 17;
    hash ^= hash << 5;

    // Ensure the result is a positive number and normalize
    return (hash >>> 0) / 2 ** 32;
  }

  getWords(): string[] {
    return this.words;
  }

  generate(count: number = 1): string[] {
    return !count
      ? []
      : this.seedChars
      ? Array.from(
          { length: count },
          () => this.words[Math.floor(this.seededRandom() * this.words.length)]
        )
      : Random.indexes(this.words.length, count).map((i) => this.words[i]);
  }

  shuffle(): void {
    Random.shuffle(this.words);
  }
}

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

    if (this.seedChars) this.shuffleWithSeed();
    else this.shuffle();
  }

  getWords(): string[] {
    return this.words;
  }

  generate(length: number = 1): string[] {
    if (length <= 0) return [];

    if (this.seedChars) {
      return Array.from({ length }, () => {
        const index = Math.floor(
          Random.seededValue(this.seedChars!, this.generations++) *
            this.words.length
        );
        return this.words[index];
      });
    }

    return Random.indexes(this.words.length, length).map((i) => this.words[i]);
  }

  shuffle(): void {
    Random.shuffle(this.words);
  }

  shuffleWithSeed(): void {
    Random.seededShuffle(this.words, this.seedChars!);
  }
}

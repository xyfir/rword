import { Random } from './Random.js';
import path from 'path';
import fs from 'fs';

export class Rword {
  private generations = 0;
  private seedChars: number[] | undefined;
  private words: string[] = [];

  constructor(list: 'big' | 'small', seed?: string) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, `../words/${list}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');

    this.seedChars = seed
      ? Array.from(seed).map((c) => c.charCodeAt(0))
      : undefined;

    this.load(JSON.parse(data));
  }

  public generate(length: number = 1): string[] {
    if (length <= 0) return [];

    if (this.seedChars) {
      return Array.from({ length }, () => {
        const index = Math.floor(
          Random.seededValue(this.seedChars!, this.generations++) *
            this.words.length,
        );
        return this.words[index];
      });
    }

    return Random.indexes(this.words.length, length).map((i) => this.words[i]);
  }

  public getWords(): string[] {
    return this.words;
  }

  public shuffle(): void {
    Random.shuffle(this.words, this.seedChars);
  }

  public load(words: string[]): void {
    this.words = words;
    this.shuffle();
  }
}

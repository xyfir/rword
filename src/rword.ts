import { Random } from './Random.js';
import path from 'path';
import fs from 'fs';

export class Rword {
  private words: string[];

  constructor(list: 'big' | 'small') {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, `../words/${list}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    this.words = JSON.parse(data);
    this.shuffle();
  }

  getWords(): string[] {
    return this.words;
  }

  generate(count: number = 1): string[] {
    return count
      ? Random.indexes(this.words.length, count).map((i) => this.words[i])
      : [];
  }

  shuffle(): void {
    Random.shuffle(this.words);
  }
}

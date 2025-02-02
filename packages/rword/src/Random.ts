export class Random {
  /**
   * Transform an integer to a floating point number.
   */
  private static intToFloat(integer: number): number {
    return integer / Math.pow(2, 64);
  }

  /**
   * Generate a random number between `0` (inclusive) and `1` (exclusive). A
   *  drop in replacement for `Math.random()`
   */
  private static value(): number {
    return this.intToFloat(
      parseInt(
        Buffer.from(
          globalThis.crypto.getRandomValues(new Uint8Array(8)),
        ).toString('hex'),
        16,
      ),
    );
  }

  /**
   * Generate a random number between `min` (inclusive) and `max` (exclusive).
   */
  private static range(min: number, max: number): number {
    return Math.floor(this.value() * (max - min) + min);
  }

  /**
   * Generate a seeded random number between `0` (inclusive) and `1` (exclusive).
   */
  public static seededValue(seedChars: number[], generations: number): number {
    let hash = 0;
    for (let i = 0; i < seedChars.length; i++) {
      const charCode = seedChars[i];
      hash = (hash << 5) - hash + charCode + generations;
      hash &= hash; // Convert to 32bit integer
    }

    // Xorshift algorithm constants
    hash ^= hash << 13;
    hash ^= hash >> 17;
    hash ^= hash << 5;

    // Ensure the result is a positive number and normalize
    return (hash >>> 0) / 2 ** 32;
  }

  /**
   * Shuffle the words in place.
   */
  public static shuffle(words: string[], seedChars?: number[]): void {
    let generations = 0;
    let temp = '';
    let i = 0;
    let j = 0;

    for (i = words.length - 1; i > 0; i -= 1) {
      if (seedChars) {
        j = Math.floor(this.seededValue(seedChars, generations++) * (i + 1));
      } else {
        j = Random.range(0, i + 1);
      }

      temp = words[i];
      words[i] = words[j];
      words[j] = temp;
    }
  }

  /**
   * Randomly generate numbers for indexes within the words array.
   *
   * @param length - The length of the words array.
   * @param count - How many indexes to generate.
   */
  public static indexes(length: number, count: number): number[] {
    const indexes = [];
    while (true) {
      const index = this.range(0, length);
      if (indexes.indexOf(index) == -1) indexes.push(index);
      if (indexes.length == count) break;
      else if (length < count && indexes.length == length) break;
    }
    return indexes;
  }
}

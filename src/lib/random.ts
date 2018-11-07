import * as crypto from 'crypto';

// Modified from https://github.com/SkepticalHippo/crypto-random
export class Random {
  /**
   * Generate a random number between `0` (inclusive) and `1` (exclusive). A
   *  drop in replacement for `Math.random()`
   */
  static value(): number {
    return typeof window !== 'undefined' && window.crypto
      ? this.browserValue()
      : this.nodeValue();
  }

  /**
   * Generate a random number between `min` (inclusive) and `max` (exclusive).
   */
  static range(min: number, max: number): number {
    return Math.floor(this.value() * (max - min) + min);
  }

  /** Get a random number between `0` (inclusive) and `1` (exclusive). */
  private static nodeValue(): number {
    return this.intToFloat(parseInt(crypto.randomBytes(8).toString('hex'), 16));
  }

  /** Get a random number between `0` (inclusive) and `1` (exclusive). */
  private static browserValue(): number {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return this.intToFloat(randomValues[0]);
  }

  /** Transform an integer to a floating point number. */
  private static intToFloat(integer: number): number {
    return integer / Math.pow(2, 64);
  }
}

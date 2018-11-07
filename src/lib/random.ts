import * as crypto from 'crypto';

export class Random {
  /**
   * Generate a random number between `0` (inclusive) and `1` (exclusive). A
   *  drop in replacement for `Math.random()`
   */
  static value(): number {
    return this.intToFloat(parseInt(crypto.randomBytes(8).toString('hex'), 16));
  }

  /**
   * Generate a random number between `min` (inclusive) and `max` (exclusive).
   */
  static range(min: number, max: number): number {
    return Math.floor(this.value() * (max - min) + min);
  }

  /** Transform an integer to a floating point number. */
  private static intToFloat(integer: number): number {
    return integer / Math.pow(2, 64);
  }
}

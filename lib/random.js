// Modified from https://github.com/SkepticalHippo/crypto-random
class Random {
  /**
   * Generate a random number between `0` (inclusive) and `1` (exclusive). A
   *  drop in replacement for `Math.random()`
   * @return {number}
   */
  static value() {
    return typeof window !== 'undefined' && window.crypto
      ? this._browserValue()
      : this._nodeValue();
  }

  /**
   * Generate a random number between `min` (inclusive) and `max` (exclusive).
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  static range(min, max) {
    return Math.floor(this.value() * (max - min) + min);
  }

  /**
   * Get a random number between `0` (inclusive) and `1` (exclusive).
   * @private
   * @return {number}
   */
  static _nodeValue() {
    const crypto = require('crypto');
    return this._intToFloat(
      parseInt(crypto.randomBytes(8).toString('hex'), 16)
    );
  }

  /**
   * Get a random number between `0` (inclusive) and `1` (exclusive).
   * @private
   * @return {number}
   */
  static _browserValue() {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return this._intToFloat(randomValues[0]);
  }

  /**
   * Transform an integer to a floating point number.
   * @private
   * @param {number} integer
   * @return {number}
   */
  static _intToFloat(integer) {
    return integer / Math.pow(2, 64);
  }
}

module.exports = Random;

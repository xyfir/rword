import { Rword } from './Rword.js';
import assert from 'assert';

await Rword.load('small');
assert(Array.isArray(Rword.generate()), 'generate() type');
assert(Array.isArray(Rword.generate(2)), 'generate(2) type');
assert.equal(Rword.generate(15).length, 15, 'generate(15) length');
assert.equal(Rword.generate(1).length, 1, 'generate(1) length');

assert.equal(Rword.words.length, 123565, 'word list (small)');

await Rword.load('big');
assert.equal(Rword.words.length, 359742, 'word list (big)');

const word = Rword.words[0];
Rword.shuffle();
assert.notEqual(Rword.words[0], word, 'shuffle');

console.log('Tests completed without error');

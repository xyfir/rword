import { rword } from './rword.js';
import assert from 'assert';

await rword.load('small');
assert(typeof rword.generate() == 'string', 'generate() type');
assert(Array.isArray(rword.generate(2)), 'generate(2) type');
assert.equal(rword.generate(15).length, 15, 'generate(15) length');

assert.equal(rword.words.length, 123565, 'word list (small)');

await rword.load('big');
assert.equal(rword.words.length, 359742, 'word list (big)');

const word = rword.words[0];
rword.shuffle();
assert.notEqual(rword.words[0], word, 'shuffle');

console.log('Tests completed without error');

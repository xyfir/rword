import { Rword } from './Rword.js';
import assert from 'assert';

Rword.load('small');

// Test generating words
assert.equal(Rword.generate(0).length, 0, 'generate(0) should return 0 words');
assert.equal(Rword.generate().length, 1, 'generate() should return 1 word');
assert.equal(
  Rword.generate(15).length,
  15,
  'generate(15) should return 15 words'
);

// Test small word list size
assert.equal(
  Rword.words.length,
  123565,
  'Word list (small) should have 123565 words'
);

// Test shuffling
const firstWord = Rword.words[0];
Rword.shuffle();
assert.notEqual(
  Rword.words[0],
  firstWord,
  'First word should change after shuffle'
);

// Test loading big word list
Rword.load('big');
assert.equal(
  Rword.words.length,
  359742,
  'Word list (big) should have 359742 words'
);

console.log('All tests completed without error');

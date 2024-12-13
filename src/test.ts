import { Rword } from './Rword.js';
import assert from 'assert';

const rwordSmall = new Rword('small');

// Test generating words
assert(
  Array.isArray(rwordSmall.generate()),
  'generate() should return an array'
);
assert(
  Array.isArray(rwordSmall.generate(2)),
  'generate(2) should return an array'
);
assert.equal(
  rwordSmall.generate(15).length,
  15,
  'generate(15) should return 15 words'
);
assert.equal(
  rwordSmall.generate(1).length,
  1,
  'generate(1) should return 1 word'
);
assert.equal(
  rwordSmall.generate(0).length,
  0,
  'generate(0) should return 0 words'
);

// Test word content
const generatedWords = rwordSmall.generate(5);
generatedWords.forEach((word) => {
  assert.equal(typeof word, 'string', 'Each generated word should be a string');
});

// Test word list size
assert.equal(
  rwordSmall.getWords().length,
  123565,
  'Word list (small) should have 123565 words'
);

const rwordBig = new Rword('big');
assert.equal(
  rwordBig.getWords().length,
  359742,
  'Word list (big) should have 359742 words'
);

// Test shuffling
const firstWord = rwordSmall.getWords()[0];
rwordSmall.shuffle();
assert.notEqual(
  rwordSmall.getWords()[0],
  firstWord,
  'First word should change after shuffle'
);

// Test multiple shuffles
const wordsBeforeShuffle = [...rwordSmall.getWords()];
rwordSmall.shuffle();
rwordSmall.shuffle();
assert.notDeepEqual(
  rwordSmall.getWords(),
  wordsBeforeShuffle,
  'Words should be shuffled'
);

// Test seeded generation
const seed = 'abcdefghijklmnopqrstuvwxyz123';
const rwordSeeded1 = new Rword('small', seed);
const rwordSeeded2 = new Rword('small', seed);
assert.deepEqual(
  rwordSeeded1.generate(5),
  rwordSeeded2.generate(5),
  'Seeded generations should be identical'
);
assert.notDeepEqual(
  rwordSeeded1.generate(5),
  rwordSeeded1.generate(5),
  'Seeded generations should increment'
);
console.log('All tests completed without error');

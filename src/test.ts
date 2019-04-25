import * as assert from 'assert';
import { rword } from './rword';

assert(typeof rword.generate() == 'string', 'generate() type');
assert(Array.isArray(rword.generate(2)), 'generate(2) type');
assert.equal(rword.generate(15).length, 15, 'generate(15) length');

assert.equal(rword.words.length, 128660, 'word list (small)');

rword.load('big');
assert.equal(rword.words.length, 370099, 'word list (big)');

const word = rword.words[0];
rword.shuffle();
assert.notEqual(rword.words[0], word, 'shuffle');

assert.equal(
  (rword.generate(10, { length: 4 }) as string[]).findIndex(w => w.length != 4),
  -1,
  'generate() exact length'
);
assert.equal(
  (rword.generate(100, { length: '3-4' }) as string[]).findIndex(
    w => w.length > 4
  ),
  -1,
  'generate() length range'
);

assert.equal(
  (rword.generate(10, { capitalize: 'none' }) as string[]).findIndex(
    w => !/^[a-z]+$/.test(w)
  ),
  -1,
  'generate() capitalize none'
);
assert.equal(
  (rword.generate(10, { capitalize: 'all' }) as string[]).findIndex(
    w => !/^[A-Z]+$/.test(w)
  ),
  -1,
  'generate() capitalize all'
);
assert.equal(
  (rword.generate(10, { capitalize: 'first' }) as string[]).findIndex(
    w => !/^[A-Z][a-z]+$/.test(w)
  ),
  -1,
  'generate() capitalize first'
);

assert.equal(
  (rword.generate(10, { contains: /ing$/ }) as string[]).filter(w =>
    /ing$/.test(w)
  ).length,
  10,
  'generate() contains'
);

assert(typeof rword.generateFromPool() == 'string', 'generateFromPool() type');
assert(Array.isArray(rword.generateFromPool(2)), 'generateFromPool(2) type');
assert.throws(() => rword.generateFromPool(11), 'generateFromPool(11)');

console.log('Tests completed without error');

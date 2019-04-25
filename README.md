A cryptographically secure Node.js random generator for real English words. Contains over 370,000 English words.

Built and maintained by [**Ptorx**](https://ptorx.com) and other [**Xyfir Network**](https://www.xyfir.com) projects.

**Note:** rword stores its words array in memory, and limited testing shows this to add about ~20-60 MB to Node's heap depending on which word list you choose. rword is built to be fast and self-contained without the need for a database and this price is paid at the expense of your RAM.

# Examples

```ts
import { rword } from 'rword';

rword.generate();
// 'bioplasm'

rword.generate(5);
// ['verniers', 'recognizes', 'shockstall', 'aerofoils', 'sooling']

rword.generate(5, { length: 5 });
// ['crags', 'allyl', 'vower', 'berob', 'divan']

rword.generate(3, { length: '3-4' });
// ['limo', 'fado', 'calf']

rword.generate(5, { contains: '.*ed' });
// ['outvied', 'lappeted', 'roared', 'needfully', 'catechized']

rword.generate(5, { contains: 'af' });
// ['falafels', 'handstaff', 'bushcrafts', 'cafila', 'cybercafe']

rword.generate(5, { contains: /.*ing$/ });
// ['depicting', 'upstanding', 'scending', 'forking', 'numbing']

rword.generate(3, { capitalize: 'all' });
// ['THEORIZED', 'RETIRE', 'HOLDBACK']

rword.generate(3, { capitalize: 'first' });
// ['Grew', 'Waxberries', 'Neesing']

rword.generateFromPool(5);
// [ 'intimae', 'shandygaff', 'likable', 'unrebated', 'broken' ]
```

# Words

rword comes with two word lists: `small`, with a "tiny" ~129k words, and `big`, with ~370k. By default, rword uses `small`.

All of the words contain _only_ `a-z` characters. There are no numbers, symbols, spaces, or diacritics.

`small` contains only words 3-10 characters in length, while `big` has no length requirements.

`small` is likely to decrease in size in the future, while `big` may increase.

# API

## `rword.generate(count, options)`

Generates words from the global words array.

- `count: number` - Optional (default `1`) - How many words to return. If `1` or not present, a string is returned. If greater than `1` an array of strings is returned.
- `options: object` - Optional - Allows you to modify the output and words that could be randomly chosen.
- `options.length: number|string` - Optional (default `'3-10'`) - Allows you to set an exact length or range of lengths for words to return.
- `options.contains: string|RegExp` - Optional (default `/.*/`) - Words that don't match the regexp will not be returned.
- `options.capitalize: string` - Optional (default `'none'`) - Changes the capitalization of the words returned. Possible values: `'none' | 'all' | 'first'`.

It should be obvious, but be warned that there's no guarantee you'll receive as many words as requested if you use any of the filtering options. In addition, adding filters to is slow, and should be avoided if possible. Use `rword.generateFromPool()` if possible as it can be much faster, especially for generating a single word.

## `rword.generateFromPool(count)`

Generates words from the global pool array. The pool is automatically filled using `rword.generate(500)` and then words are taken out of that array as needed. Can be faster than `rword.generate()` for generating small amounts of words.

- `count: number` - Optional (default `1`) - How many words to return. If `1` or not present, a string is returned. If greater than `1` an array of strings is returned.

**Limitations:**

- No options object is accepted.
- You cannot request more than 10 words through this method.

## `rword.load(list)`

Loads and shuffles word list. This is a blocking function that does a lot of processing, so don't call it often.

- `list: "big" | "small"` - The list you'll load into rword. `"small"` is automatically loaded upon first importing rword.

## `rword.shuffle()`

Shuffles both the global and pool words arrays. This method can most likely be ignored as it is automatically called on first run.

## `rword.words`

The full (shuffled) words array that is used internally by rword. Likely there's no need for this but if you'd like to bypass the rword API and just utilize its words then this is what you'll need.

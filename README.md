A cryptographically secure Node.js random generator for real English words. Contains over 350,000 English words.

**Note:** rword stores its words array in memory, and limited testing shows this to add about ~20-60 MB to Node's heap depending on which word list you choose. rword is built to be fast and self-contained without the need for a database and this price is paid at the expense of your RAM.

# Examples

```ts
import { rword } from 'rword';

rword.generate();
// 'bioplasm'

rword.generate(5);
// ['verniers', 'recognizes', 'shockstall', 'aerofoils', 'sooling']

```

# Words

rword comes with two word lists: `small`, with a "tiny" ~123k words, and `big`, with ~350k. By default, rword uses `small`.

All of the words contain _only_ `a-z` characters. There are no numbers, symbols, spaces, or diacritics.

`small` contains only words 3-10 characters in length, while `big` has no length requirements.

`small` is likely to decrease in size in the future, while `big` may increase.

# API

## `rword.generate(count)`

Generates words from the global words array.

- `count: number` - Optional (default `1`) - How many words to return. If `1` or not present, a string is returned. If greater than `1` an array of strings is returned.
## `rword.load(list)`

Loads and shuffles word list. This is a blocking function that does a lot of processing, so don't call it often.

- `list: "big" | "small"` - The list you'll load into rword. `"small"` is automatically loaded upon first importing rword.

## `rword.shuffle()`

Shuffles both the global and pool words arrays. This method can most likely be ignored as it is automatically called on first run.

## `rword.words`

The full (shuffled) words array that is used internally by rword. Likely there's no need for this but if you'd like to bypass the rword API and just utilize its words then this is what you'll need.

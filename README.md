A cryptographically secure Node.js random generator for real English words. Contains over 350,000 English words.

**Note:** Rword stores its words array in memory, and limited testing shows this to add about ~20-60 MB to Node's heap depending on which word list you choose. Rword is built to be fast and self-contained without the need for a database and this price is paid at the expense of your RAM.

# Examples

```ts
import { Rword } from 'rword';

const rword = new Rword('small');

rword.generate();
// ['bioplasm']

rword.generate(5);
// ['verniers', 'recognizes', 'shockstall', 'aerofoils', 'sooling']
```

# Words

Rword comes with two word lists: `small`, with a "tiny" ~123k words, and `big`, with ~350k. By default, Rword uses `small`.

All of the words contain _only_ `a-z` characters. There are no numbers, symbols, spaces, or diacritics.

`small` contains only words 3-10 characters in length, while `big` has no length requirements.

`small` is likely to decrease in size in the future, while `big` may increase.

# API

## `new Rword(list)`

Creates an instance of Rword with the specified word list.

- `list: "big" | "small"` - The list to load into the Rword instance.

## `rword.generate(count)`

Generates words from the instance's words array.

- `count: number` - Optional (default `1`) - How many words to return. An array of strings is always returned.

## `rword.shuffle()`

Shuffles the instance's words array. This method is automatically called upon instantiation.

## `rword.getWords()`

Returns the full (shuffled) words array used internally by the Rword instance.

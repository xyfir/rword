A random generator for real English words. Contains over 120,000 English words between 3 and 10 characters long.

Used by multiple projects in the [Xyfir Network](https://xyfir.com/#/network).

# Usage

```js
const rword = require("rword");

rword();
// "bioplasm"

rword(5);
// ["verniers", "recognizes", "shockstall", "aerofoils", "sooling"]

rword(5, { length: 5 });
// ["crags", "allyl", "vower", "berob", "divan"]

rword(3, { length: "3-4" });
// ["limo", "fado", "calf"]

rword(5, { contains: ".*ed" });
// ["outvied", "lappeted", "roared", "needfully", "catechized"]

rword(5, { contains: "af" })
// ["falafels", "handstaff", "bushcrafts", "cafila", "cybercafe"]

rword(5, { contains: /.*ing$/ })
// ["depicting", "upstanding", "scending", "forking", "numbing"]

rword(3, { capitalize: "all" });
// ["THEORIZED", "RETIRE", "HOLDBACK"]

rword(3, { capitalize: "first" });
// ["Grew", "Waxberries", "Neesing"]
```

# How are the words generated?

The words array is shuffled on first load with `Math.random()` and every 10 to 30 minutes after, or whenever `rword.shuffle()` is called. Words are then randomly selected from this array using `Math.random()` again. The shuffled words array is shared across all rword instances.

# Notes

- Requesting a single word will always return a string. Requesting multiple words will always return an array.
- When using `length` and `contains`, there's no guarantee you'll receive a word or as many words as you requested. If you requested one word and none where found, an empty string will be returned. If you requested multiple words and none were found an empty array will be returned.
- It is *much* faster to generate multiple words in one call than it is to make multiple calls. Don't be afraid to generate large arrays of random words. If you know you'll need multiple words, try to keep it all in one call. Don't call rword from within a loop if you can help it. **It's faster to generate 10,000 words in one call than it is one word in 10 calls.**
- An array of strings is set (`__words`) to the global object (`global` in Node and `window` in the browser). You will have issues if for some reason your code utilizes `__words` for some other purpose. 
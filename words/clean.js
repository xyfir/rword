const { SIGUSR2 } = require('constants');
const fs = require('fs');

let words = JSON.parse(fs.readFileSync('./small.json', 'utf8'));
let bad = JSON.parse(fs.readFileSync('./bad.json', 'utf8'));
bad = bad.filter((b) => !!b.trim());

console.log('words length', words.length);
words = words.filter((w) => !bad.some((w2) => w.startsWith(w2)));
console.log('cleaned words length', words.length);

fs.writeFileSync('./small.json', JSON.stringify(Array.from(new Set(words))));

const generateIndexes = require("./lib/generate-indexes");
const shuffle = require("./lib/shuffle-words");
const rand = require("./lib/rand");

if (!global.__words) {
    global.__words = require("./words/english");
    shuffle();

    // Shuffle array on interval
    setInterval(() => shuffle(), 60 * rand(10, 30) * 1000);
}

function rword(count = 1, opt) {

    opt = Object.assign({
        contains: /.*/g, length: "3-10",
        capitalize: "none"
    }, opt);

    // Convert opt.length to object
    if (typeof opt.length == "string" && opt.length.indexOf("-") > 0) {
        opt.length = opt.length.split("-");

        opt.length = {
            start: +opt.length[0], end: +opt.length[1]
        };
    }
    else {
        opt.length = {
            exactly: +opt.length
        };
    }

    // Convert opt.contains to regular expression
    if (typeof opt.contains == "string")
        opt.contains = new RegExp(opt.contains);

    let words;

    // Skip filtering if possible
    if (!opt.contains && opt.length.start == 3 && opt.length.end == 10) {
        words = global.__words;
    }
    else {
        words = global.__words.filter(word => {
            // Filter out words that don't match length
            if (opt.length.exactly) {
                if (word.length != opt.length.exactly)
                    return false;
            }
            else {
                if (word.length < opt.length.start || word.length > opt.length.end)
                    return false;
            }

            // Filter out words that don't contain regex
            if (opt.contains)
                return opt.contains.test(word);
            else 
                return true;
        });
    }

    if (!words.length) return count == 1 ? "" : [];

    // Generate indexes for words to return
    const indexes = generateIndexes(words.length, count), temp = [];

    // Select words by index
    // Faster than looping through all elements in words[]
    indexes.forEach(index => temp.push(words[index]));
    words = temp;

    // Capitalize words
    if (opt.capitalize != "none") {
        if (opt.capitalize == "all")
            words = words.map(w => w.toUpperCase());
        else if (opt.capitalize == "first")
            words = words.map(w => w[0].toUpperCase() + w.slice(1));
    }

    // Return string or array of string
    return count == 1 ? words[0] : words;

}

rword.shuffle = shuffle;

module.exports = rword;
const rand = require("./rand");

module.exports = function(length, count) {

    const indexes = [];

    while (true) {
        const index = rand(0, length);

        // Check if index was chosen before
        if (indexes.indexOf(index) == -1)
            indexes.push(index);
        
        // Stop looping if we've hit limit
        if (indexes.length == count)
            break;
        else if (length < count && indexes.length == length)
            break;
    }

    return indexes;

};
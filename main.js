//  Steps
//
//  1) parse description string input and convert into numbers
//    start by assuming:
//      perfectly structured input (no error handling for user defined inputs at this stage);
//      simple input ('first fortieth of it') only, no compound inputs ('first tenth of first fortieth of it')
//    initial thought is to construct a hash table of with string keys and integer values that is
//    constructed at compile time or inside of an object as an instantly evaluated function
//
//  2) Adjust logic for compound inputs ('first tenth of first fortieth of it')
//     these can be stored in an array of arrays (e.g. [[1, 10], [1, 40]]) or maybe objects
//     storing them in reverse order could be good, since they will be evaluated in that order
//     (first, find the first 40th, then find the first 10th of that)
//
//  3) Apply the logic to locate the substring
//     we can just use some math to figure out the starting and ending indices
//     returning or throwing an error if the length of any given substring is not evenly divisible by the second number
//     or returning the substring if it can be found
//
//  If time allows:
//  4) Allow for user defined inputs as a CLI or UI (prefer UI), with error handling
//
//
//  Edge Cases:
//    - 'second' and 'half' should both represent 2, but 'second' must be the first word and 'half' must be the last
var Oridinal = /** @class */ (function () {
    // TODO: stronger validations?
    // parameter validations (spacing, number of words)?
    // 'fifth of fourth' as an invalid input
    // consider seperately requiring section and divisor strings as input
    function Oridinal(ordinalDescription) {
        this.ordinalDescription = ordinalDescription.split(' ');
        this.selection = Oridinal.ordinalMap[this.ordinalDescription[0]];
        this.divisor = Oridinal.ordinalMap[this.ordinalDescription[1]];
    }
    Oridinal.ordinalMap = function () {
        var ordinals = { 'hundreth': 100, 'half': 2 };
        var uniques = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
        var tensPrefix = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
        for (var i = 1; i < 100; i++) {
            var key = void 0;
            // TODO: move block to new method
            if (i < 20) {
                key = uniques[i - 1];
            }
            else if (i % 10 === 0) {
                key = tensPrefix[(i / 10) - 2] + 'ieth';
            }
            else {
                key = tensPrefix[Math.floor((i / 10)) - 2] + 'y' + uniques[(i % 10) - 1];
            }
            ordinals[key] = i;
        }
        return ordinals;
    }();
    return Oridinal;
}());
// TODO: return error instead of throwing
function parseOrdinalDescription(ordinalDescription) {
    var oridinalStrings = ordinalDescription.trim().split(' of ');
    if (oridinalStrings[oridinalStrings.length - 1].toLowerCase() !== 'it') {
        throw 'Malformatted description: description must end with "of it"';
    }
    return oridinalStrings.slice(0, oridinalStrings.length - 1);
}
console.log(new Oridinal('first half'));
function main(description, inputs) {
    var ordinalStrings = parseOrdinalDescription(description);
    console.log(ordinalStrings);
    return [];
}
console.log(main(' second fourth of first half of it', ['abcd']));
// error
console.log(main("second fourth of it", ["abcd", "abcdefgh"]));
//would return
//["b", "cd"]
console.log(main("second third of first third of it", ["123456789"]));
//would return
//["2"]
console.log(main("third fourth of it", ["abcdef"]));
//would return an error because there is invalid input, 6 cannot be evenly divided into 4.
console.log(main("fifth fourth of it", ["abcd"]));
//would return an error because there is invalid input, you can't take the fifth of four parts.

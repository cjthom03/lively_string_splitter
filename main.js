"use strict";
exports.__esModule = true;
exports.main = void 0;
var Oridinal = /** @class */ (function () {
    // TODO: stronger validations?
    // parameter validations (spacing, number of words)?
    // 'fifth of fourth' as an invalid input
    // consider separately requiring section and divisor strings as input
    function Oridinal(ordinalDescription) {
        this.ordinalDescription = ordinalDescription;
        var ordinalParts = this.ordinalDescription.split(' ');
        this.selection = Oridinal.ordinalMap[ordinalParts[0]];
        this.divisor = Oridinal.ordinalMap[ordinalParts[1]];
    }
    Oridinal.ordinalMap = function () {
        var ordinals = { 'hundreth': 100 };
        var uniques = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
        var tensPrefix = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
        for (var i = 1; i < 100; i++) {
            var key = void 0;
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
function main(description, inputs) {
    var ordinalStrings = parseOrdinalDescription(description);
    var ordinals = ordinalStrings.map(function (string) { return new Oridinal(string); });
    return inputs.map(function (stringToSplit) {
        //TODO: probably can do some math to simplify
        for (var i = ordinals.length - 1; i >= 0; i--) {
            var ordinal = ordinals[i];
            if (stringToSplit.length % ordinal.divisor !== 0) {
                return new Error("Input string is not divisible by ".concat(ordinal.divisor));
            }
            //TODO: This error should happen earlier, and not returned for each input string
            if (ordinal.divisor < ordinal.selection) {
                return new Error("Cannot select the ".concat(ordinal.ordinalDescription, " of the input string"));
            }
            var newLength = stringToSplit.length / ordinal.divisor;
            var endIndex = (newLength * ordinal.selection);
            var startIndex = endIndex - newLength;
            stringToSplit = stringToSplit.substring(startIndex, endIndex);
        }
        return stringToSplit;
    });
}
exports.main = main;
console.log("third fourth of it", ["abcdef"]);
console.log(main("third fourth of it", ["abcdef"]));
//would return an error because there is invalid input, 6 cannot be evenly divided into 4.
console.log("fifth fourth of it", ["abcd"]);
console.log(main("fifth fourth of it", ["abcd"]));
//would return an error because there is invalid input, you can't take the fifth of four parts.

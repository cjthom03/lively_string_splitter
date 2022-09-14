"use strict";
exports.__esModule = true;
exports.main = void 0;
var OridinalPair = /** @class */ (function () {
    function OridinalPair(selectorDescription, divisorDescription) {
        var _this = this;
        this.valid = function () {
            if (_this.selector > _this.divisor) {
                _this.error = new Error("Cannot take the ".concat(_this.selectorDescription, " ").concat(_this.divisorDescription, " of a string"));
                return false;
            }
            ;
            return true;
        };
        this.selectorDescription = selectorDescription;
        this.divisorDescription = divisorDescription;
        this.selector = OridinalPair.ordinalMap[this.selectorDescription];
        this.divisor = OridinalPair.ordinalMap[this.divisorDescription];
        this.error = undefined;
    }
    OridinalPair.ordinalMap = function () {
        var ordinals = { 'hundreth': 100 };
        var uniques = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
            'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
            'nineteenth'];
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
    return OridinalPair;
}());
// Input string is structured as: "First third of it" Or "First eighth of ninth twentieth of it"
function parseOrdinalDescription(ordinalDescription) {
    var oridinalStrings = ordinalDescription.split(' of ');
    return oridinalStrings.slice(0, oridinalStrings.length - 1).map(function (description) { return description.split(' '); });
}
function main(description, inputs) {
    var ordinalDescriptions = parseOrdinalDescription(description);
    var ordinals = ordinalDescriptions.map(function (pairs) { return new OridinalPair(pairs[0], pairs[1]); });
    for (var i = 0; i < ordinals.length; i++) {
        if (!ordinals[i].valid())
            return ordinals[i].error;
    }
    return inputs.map(function (stringToSplit) {
        //TODO: probably can do some math to simplify
        for (var i = ordinals.length - 1; i >= 0; i--) {
            var ordinal = ordinals[i];
            if (stringToSplit.length % ordinal.divisor !== 0) {
                return new Error("Input string is not divisible by ".concat(ordinal.divisor));
            }
            var newLength = stringToSplit.length / ordinal.divisor;
            var endIndex = (newLength * ordinal.selector);
            var startIndex = endIndex - newLength;
            stringToSplit = stringToSplit.substring(startIndex, endIndex);
        }
        return stringToSplit;
    });
}
exports.main = main;

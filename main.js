"use strict";
exports.__esModule = true;
exports.main = void 0;
var ordinal_pair_1 = require("./ordinal_pair");
// Input string is structured as: "First third of it" Or "First eighth of ninth twentieth of it"
function parseOrdinalDescription(ordinalDescription) {
    var oridinalStrings = ordinalDescription.split(' of ');
    return oridinalStrings.slice(0, oridinalStrings.length - 1).map(function (description) { return description.split(' '); });
}
function main(description, inputs) {
    var ordinalDescriptions = parseOrdinalDescription(description);
    var ordinals = ordinalDescriptions.map(function (pairs) { return new ordinal_pair_1.OridinalPair(pairs[0], pairs[1]); });
    var _a = [1, 1], selector = _a[0], divisor = _a[1];
    for (var i = 0; i < ordinals.length; i++) {
        if (!ordinals[i].valid())
            return ordinals[i].error;
        selector *= ordinals[i].selector;
        divisor *= ordinals[i].divisor;
    }
    return inputs.map(function (stringToSplit) {
        if (stringToSplit.length % divisor !== 0)
            return new Error("Input string is not divisible by ".concat(divisor));
        var newLength = stringToSplit.length / divisor;
        var endIndex = (newLength * selector);
        var startIndex = endIndex - newLength;
        return stringToSplit.substring(startIndex, endIndex);
    });
}
exports.main = main;

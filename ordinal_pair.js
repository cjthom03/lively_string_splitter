"use strict";
exports.__esModule = true;
exports.OridinalPair = void 0;
var OridinalPair = /** @class */ (function () {
    function OridinalPair(selectorDescription, divisorDescription) {
        var _this = this;
        this.valid = function () {
            if (_this.selector > _this.divisor || _this.divisor < 3) {
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
    OridinalPair.getOrdinalKey = function (value) {
        var uniques = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
            'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
            'nineteenth'];
        var tensPrefix = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
        if (value < 20)
            return uniques[value - 1];
        if (value % 10 === 0)
            return tensPrefix[(value / 10) - 2] + 'ieth';
        return tensPrefix[Math.floor((value / 10)) - 2] + 'y' + uniques[(value % 10) - 1];
    };
    OridinalPair.ordinalMap = function () {
        var ordinals = { 'hundreth': 100 };
        for (var i = 1; i < 100; i++) {
            ordinals[OridinalPair.getOrdinalKey(i)] = i;
        }
        return ordinals;
    }();
    return OridinalPair;
}());
exports.OridinalPair = OridinalPair;

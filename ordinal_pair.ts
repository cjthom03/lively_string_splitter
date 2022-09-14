type OrdinalMap = {
  [key: string]: number
}

export class OridinalPair {
  selectorDescription: string;
  divisorDescription: string;
  selector: number;
  divisor: number;
  error: undefined | Error;

  static getOrdinalKey = (value: number): string => {
    const uniques = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
      'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
      'nineteenth'];
    const tensPrefix = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

    if(value < 20) return uniques[value - 1]
    if(value % 10 === 0) return tensPrefix[(value/10) - 2] + 'ieth';
    return tensPrefix[Math.floor((value/10)) - 2] + 'y' + uniques[(value % 10) - 1];
  }

  static ordinalMap: OrdinalMap = function() {
    const ordinals = { 'hundreth': 100 }

    for(let i = 1; i < 100; i++) { ordinals[OridinalPair.getOrdinalKey(i)] = i }

    return ordinals;
  }();


  constructor(selectorDescription: string, divisorDescription: string) {
    this.selectorDescription = selectorDescription;
    this.divisorDescription = divisorDescription;
    this.selector = OridinalPair.ordinalMap[this.selectorDescription];
    this.divisor = OridinalPair.ordinalMap[this.divisorDescription];
    this.error = undefined;
  }

  get description() { return `${this.selectorDescription} ${this.divisorDescription}` }

  valid = (): boolean => {
    if(this.selector > this.divisor || this.divisor < 3 || this.selector === undefined || this.divisor === undefined) {
      this.error = new Error(`Cannot support taking the ${this.description} of a string`);
      return false;
    };

    return true;
  }

  invalid = (): boolean => !this.valid();
}

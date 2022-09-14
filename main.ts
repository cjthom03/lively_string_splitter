type OrdinalMap = {
  [key: string]: number
}

class OridinalPair {
  selectorDescription: string;
  divisorDescription: string;
  selector: number;
  divisor: number;
  error: undefined | Error;

  static ordinalMap: OrdinalMap = function() {
    const ordinals = { 'hundreth': 100 }
    const uniques = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
      'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
      'nineteenth'];
    const tensPrefix = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

    for(let i = 1; i < 100; i++) {
      let key: string;

      if(i < 20) {
        key = uniques[i - 1];
      } else if(i % 10 === 0) {
        key = tensPrefix[(i/10) - 2] + 'ieth';
      } else {
        key = tensPrefix[Math.floor((i/10)) - 2] + 'y' + uniques[(i % 10) - 1];
      }

      ordinals[key] = i;
    }

    return ordinals;
  }();

  constructor(selectorDescription: string, divisorDescription: string) {
    this.selectorDescription = selectorDescription;
    this.divisorDescription = divisorDescription;
    this.selector = OridinalPair.ordinalMap[this.selectorDescription];
    this.divisor = OridinalPair.ordinalMap[this.divisorDescription];
    this.error = undefined;
  }

  valid = (): boolean => {
    if(this.selector > this.divisor || this.divisor < 3) {
      this.error = new Error(`Cannot take the ${this.selectorDescription} ${this.divisorDescription} of a string`);
      return false;
    };

    return true;
  }
}

// Input string is structured as: "First third of it" Or "First eighth of ninth twentieth of it"
function parseOrdinalDescription(ordinalDescription: string): string[][] {
  const oridinalStrings: string[] = ordinalDescription.split(' of ');
  return oridinalStrings.slice(0, oridinalStrings.length - 1).map((description:string) => description.split(' '));
}


export function main(description: string, inputs: string[]): Error | (string | Error)[] {
  const ordinalDescriptions = parseOrdinalDescription(description);
  const ordinals = ordinalDescriptions.map((pairs: string[]) => new OridinalPair(pairs[0], pairs[1]))

  for(let i = 0; i < ordinals.length; i++) {
    if(!ordinals[i].valid()) return ordinals[i].error;
  }

  return inputs.map((stringToSplit: string) => {
    //TODO: probably can do some math to simplify
    for(let i = ordinals.length - 1; i >= 0; i--) {
      let ordinal = ordinals[i];

      if(stringToSplit.length % ordinal.divisor !== 0) {
        return new Error(`Input string is not divisible by ${ordinal.divisor}`)
      }

      let newLength = stringToSplit.length / ordinal.divisor;
      let endIndex = (newLength * ordinal.selector);
      let startIndex = endIndex - newLength;

      stringToSplit = stringToSplit.substring(startIndex, endIndex);
    }

    return stringToSplit;
  })
}

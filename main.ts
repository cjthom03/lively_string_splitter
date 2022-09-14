type OrdinalMap = {
  [key: string]: number
}

class Oridinal {
  ordinalDescription: string;
  selection: number;
  divisor: number;

  static ordinalMap: OrdinalMap = function() {
    const ordinals = { 'hundreth': 100 }
    const uniques = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
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

  // TODO: stronger validations?
  // parameter validations (spacing, number of words)?
  // 'fifth of fourth' as an invalid input
  // consider separately requiring section and divisor strings as input
  constructor(ordinalDescription: string) {
    this.ordinalDescription = ordinalDescription;

    let ordinalParts = this.ordinalDescription.split(' ')

    this.selection = Oridinal.ordinalMap[ordinalParts[0]];
    this.divisor = Oridinal.ordinalMap[ordinalParts[1]];
  }
}

// TODO: return error instead of throwing
function parseOrdinalDescription(ordinalDescription: string): string[] {
  const oridinalStrings = ordinalDescription.trim().split(' of ');

  if(oridinalStrings[oridinalStrings.length - 1].toLowerCase() !== 'it' ) {
    throw 'Malformatted description: description must end with "of it"'
  }

  return oridinalStrings.slice(0, oridinalStrings.length - 1);
}


export function main(description: string, inputs: string[]): (string | Error)[] {
  const ordinalStrings = parseOrdinalDescription(description);
  const ordinals = ordinalStrings.map((string: string) => new Oridinal(string))

  return inputs.map((stringToSplit: string) => {
    //TODO: probably can do some math to simplify
    for(let i = ordinals.length - 1; i >= 0; i--) {
      let ordinal = ordinals[i];

      if(stringToSplit.length % ordinal.divisor !== 0) {
        return new Error(`Input string is not divisible by ${ordinal.divisor}`)
      }

      //TODO: This error should happen earlier, and not returned for each input string
      if(ordinal.divisor < ordinal.selection) {
        return new Error(`Cannot select the ${ordinal.ordinalDescription} of the input string`)
      }

      let newLength = stringToSplit.length / ordinal.divisor;
      let endIndex = (newLength * ordinal.selection);
      let startIndex = endIndex - newLength;

      stringToSplit = stringToSplit.substring(startIndex, endIndex);
    }

    return stringToSplit;
  })
}

console.log("third fourth of it", ["abcdef"])
console.log(main("third fourth of it", ["abcdef"]))
//would return an error because there is invalid input, 6 cannot be evenly divided into 4.

console.log("fifth fourth of it", ["abcd"])
console.log(main("fifth fourth of it", ["abcd"]))
//would return an error because there is invalid input, you can't take the fifth of four parts.


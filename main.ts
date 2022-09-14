import { OridinalPair } from './ordinal_pair';

// Input string is structured as: "First third of it" Or "First eighth of ninth twentieth of it"
function parseOrdinalDescription(ordinalDescription: string): string[][] {
  const oridinalStrings: string[] = ordinalDescription.split(' of ');
  return oridinalStrings.slice(0, oridinalStrings.length - 1).map((description:string) => description.split(' '));
}


export function main(description: string, inputs: string[]): Error | (string | Error)[] {
  const ordinalDescriptions = parseOrdinalDescription(description);
  const ordinals = ordinalDescriptions.map((pairs: string[]) => new OridinalPair(pairs[0], pairs[1]))
  let [selector, divisor] = [1, 1];

  for(let i = 0; i < ordinals.length; i++) {
    if(!ordinals[i].valid()) return ordinals[i].error;
    selector *= ordinals[i].selector;
    divisor *= ordinals[i].divisor;
  }

  return inputs.map((stringToSplit: string) => {
      if(stringToSplit.length % divisor !== 0) return new Error(`Input string is not divisible by ${divisor}`)

      let newLength = stringToSplit.length / divisor;
      let endIndex = (newLength * selector);
      let startIndex = endIndex - newLength;

      return stringToSplit.substring(startIndex, endIndex);
    })
}

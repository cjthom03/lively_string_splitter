import { main } from '../main';

function inputString(length: number): string {
  let chars = []

  for(let i = 1; i <= length; i++) {
    chars.push((i % 10).toString())
  }

  return chars.join('');
}

describe('main()', () => {
  describe('valid inputs', () => {
    test('valid description, with one valid string to split', () => {
      expect(main("second fourth of it", ['abcd'])).toEqual(['b'])
    })

    // Assuming an empty string is a valid input
    // because 0/n === 0
    test('valid description, with empty string to split', () => {
      expect(main("first fourth of it", [''])).toEqual([''])
    })

    test('valid description, with two valid strings to split', () => {
      expect(main("second fourth of it", ['abcd', 'abcdefgh'])).toEqual(['b', 'cd'])
    })

    test('valid compound description, with one valid string to split', () => {
      expect(main("second third of first third of it", ['123456789'])).toEqual(['2'])
    })

    test('valid description, with larger ordinals and larger input strings', () => {
      expect(main("thirtysecond ninetyeighth of it", [inputString(98), inputString(98*2)])).toEqual(['2', '34'])
    })

    test('valid compound description with large ordinals and large input string', () => {
      expect(main("first thirtieth of twentieth fortieth of it", [inputString(30 * 40)])).toEqual(['0'])
    })
  })

  describe('invalid inputs', () => {
    test('valid description, with invalid length string to split', () => {
      const result = main("third fourth of it", ["abcdef"])[0];
      expect(result).toBeInstanceOf(Error)
      expect((result as Error).message).toBe("Input string is not divisible by 4")
    })

    test('valid description, with one valid and one invalid string to be split', () => {
      const result = main("eleventh eleventh of it", ['1234567890a', '123']);
      expect(result[0]).toBe('a')
      expect(result[1]).toBeInstanceOf(Error)
      expect((result[1] as Error).message).toBe("Input string is not divisible by 11")
    })

    test('valid description, with two invalid strings to be split', () => {
      const result = main("eleventh hundreth of it", ['1234567890a', '123']);
      expect(result[0]).toBeInstanceOf(Error)
      expect((result[1] as Error).message).toBe("Input string is not divisible by 100")
      expect(result[1]).toBeInstanceOf(Error)
      expect((result[1] as Error).message).toBe("Input string is not divisible by 100")
    })

    test('invalid description "first footh of it"', () => {
      const result = main("first footh of it", ["abcdef"]);
      expect(result).toBeInstanceOf(Error)
      expect((result as Error).message).toBe("Cannot support taking the first footh of a string")
    })

    test('invalid description "first first of it"', () => {
      const result = main("first first of it", ["abcdef"]);
      expect(result).toBeInstanceOf(Error)
      expect((result as Error).message).toBe("Cannot support taking the first first of a string")
    })

    test('invalid description "first second of it"', () => {
      const result = main("first second of it", ["abcdef"]);
      expect(result).toBeInstanceOf(Error)
      expect((result as Error).message).toBe("Cannot support taking the first second of a string")
    })

    test('invalid description where first ordinal is greater than the second', () => {
      const result = main("fifth fourth of it", ["abcd"])
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("Cannot support taking the fifth fourth of a string")
    })

    test('invalid compunnd description with an ordinal pair where the first is greater than the second', () => {
      const result = main("first third of ninetythird fourth of it", ["abcd"])
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("Cannot support taking the ninetythird fourth of a string")
    })
  })
})

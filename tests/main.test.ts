import { main } from '../main';

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
  })

  describe('invalid inputs', () => {
    // one invalid string inputs
    // one valid & one invalid string inputs
    // two invalid string inputs
    // undefined ordinals "first footh of it" (not needed, assuming perfect inputs?)


    test('valid description, with invalid length string to split', () => {
      const result = main("third fourth of it", ["abcdef"])[0];
      expect(result).toBeInstanceOf(Error)
      expect((result as Error).message).toBe("Input string is not divisible by 4")
    })

    test('invalid description "first first of it"', () => {
      const result = main("first first of it", ["abcdef"]);
      expect(result).toBeInstanceOf(Error)
      expect((result as Error).message).toBe("Cannot take the first first of a string")
    })

    test('invalid description "first second of it"', () => {
      const result = main("first second of it", ["abcdef"]);
      expect(result).toBeInstanceOf(Error)
      expect((result as Error).message).toBe("Cannot take the first second of a string")
    })

    test('invalid description where first ordinal is greater than the second', () => {
      const result = main("fifth fourth of it", ["abcd"])
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("Cannot take the fifth fourth of a string")
    })

    test('invalid compunnd description with an ordinal pair where the first is greater than the second', () => {
      const result = main("first third of ninetythird fourth of it", ["abcd"])
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe("Cannot take the ninetythird fourth of a string")
    })
  })
})

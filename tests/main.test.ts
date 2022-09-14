import { main } from '../main';

describe('main()', () => {
  describe('valid inputs', () => {
    test('valid description, with one valid string to split', () => {
      expect(main("second fourth of it", ['abcd'])).toEqual(['b'])
    })

    test('valid description, with two valid strings to split', () => {
      expect(main("second fourth of it", ['abcd', 'abcdefgh'])).toEqual(['b', 'cd'])
    })

    test('valid compound description, with one valid string to split', () => {
      expect(main("second third of first third of it", ['123456789'])).toEqual(['2'])
    })
  })

  describe('invalid inputs', () => {
    // first first
    // second second
    // simple invalid description
    // compound invalid description
    // one invalid string inputs
    // one valid & one invalid string inputs
    // two invalid string inputs
  })
})

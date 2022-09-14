Retrieving a part of a string
---------------------------

We'll be writing a program that takes an input string and a description, and uses the description to retrieve part of the input string.

For example, if the input string is "123456789" and the description is "first third of it", the result should be "123". And if the input string is "123456789" and the description is "third third of it" the result should be "789".

The program should support "first third of it", "first fourth of it", "first fifth of it", all the way up to "first ninetyeighth of it" and "first ninetyninth of it" and "first hundredth of it" (but no bigger numbers need to be supported). The "second fourth" of "abcdefgh" would be "cd".  For simplicity, if the number of letters can't be evenly divided, your program should return an error or exception. So "first sixth" of "abcdefghi" returns an error because 9 letters isn't evenly divisible into 6 parts, and "second fifth" of "abcd" returns an error because 4 letters can't be evenly divided into 5 parts. Also, mispelled words and invalid input returns an error.

As an added challenge, the program should support more than one step. If the input string is "123456789" and the description is "second third of first third of it" the result should be "2". The program should also support "second third of first third of sixth seventh of it" and so on. (You don't need to worry about very large inputs/memory limits, though).

You should have a main function that takes a description and an array of input strings. You will loop through the array of input strings and retrieve the result for each input string. You should return either an array of output strings or an error/exception if there is invalid input.

Please write in TypeScript or another commonly-used language.
Let's say your main function is function main(description: string, inputs: string[]) {...}
Then
main("second fourth of it", ["abcd", "abcdefgh"])
would return
["b", "cd"]

main("second third of first third of it", ["123456789"])
would return
["2"]

main("third fourth of it", ["abcdef"])
would return an error because there is invalid input, 6 cannot be evenly divided into 4.

main("fifth fourth of it", ["abcd"])
would return an error because there is invalid input, you can't take the fifth of four parts.

Please organize your code so that it's not too difficult to follow, but feel free to use any convention you like for everything like tabs vs spaces etc!

-----------------------------------------------------------------------------------------

Thought Process

  Steps

  1) parse description string input and convert into numbers
    start by assuming:
      perfectly structured input (no error handling for user defined inputs at this stage);
      simple input ('first fortieth of it') only, no compound inputs ('first tenth of first fortieth of it')
    initial thought is to construct a hash table of with string keys and integer values that is
    constructed at compile time or inside of an object as an instantly evaluated function

  2) Adjust logic for compound inputs ('first tenth of first fortieth of it')
     these can be stored in an array of arrays (e.g. [[1, 10], [1, 40]]) or maybe objects
     storing them in reverse order could be good, since they will be evaluated in that order
     (first, find the first 40th, then find the first 10th of that)

  3) Apply the logic to locate the substring
     we can just use some math to figure out the starting and ending indices
     returning or throwing an error if the length of any given substring is not evenly divisible by the second number
     or returning the substring if it can be found

  If time allows:
  4) Allow for user defined inputs as a CLI or UI (prefer UI), with error handling

  Edge Cases
    - 'first first of it' (no need to support, but should defend against?)
    - 'second second of it' (no need to support, but should defend against?)



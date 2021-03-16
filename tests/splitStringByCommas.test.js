const map = require('../utilities').map
const filter = require('../utilities').filter
const splitStringByCommas = require('../utilities').splitStringByCommas
const filterStringsWithCommas = require('../utilities').filterStringsWithCommas

const randomStrings = require('../data/random-strings')
const arrayOfArrays = require('../data/array-of-arrays')

test('splitStringByCommas will split a string at each comma', () => {
  const expected = ['hello', 'world']
  const actual = splitStringByCommas('hello, world')
  expect(actual).toEqual(expected)
})

test('splitStringByCommas will split all strings in the arrayOfArrays, at each comma', () => {
  const stringsWithCommas = filter(randomStrings, filterStringsWithCommas) || []
  const mappedArray = map(stringsWithCommas, splitStringByCommas) || []
  
  const arraysMatch = mappedArray.length && mappedArray.every((arr, i) => {
    return arr.every((str, j) => {
      return str === arrayOfArrays[i][j]
    })
  })
  expect(arraysMatch).toBeTruthy()
})

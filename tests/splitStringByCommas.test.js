const map = require('../utilities').map
const filter = require('../utilities').filter
const splitStringByCommas = require('../utilities').splitStringByCommas
const filterStringsWithCommas = require('../utilities').filterStringsWithCommas

const randomStrings = require('../data/random-strings')
const arrayOfArrays = require('../data/array-of-arrays')

test('the generated array of array of strings matches the expected array', () => {
  const stringsWithCommas = filter(randomStrings, filterStringsWithCommas) || []
  const mappedArray = map(stringsWithCommas, splitStringByCommas) || []
  const arraysMatch = mappedArray.length && mappedArray.every((arr, i) => {
    return arr.every((str, j) => {
      return str === arrayOfArrays[i][j]
    })
  })
  expect(arraysMatch).toBeTruthy()
})

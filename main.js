var assert = require('./utils/assert')
var data = require('./data/data')
var expectedArrayOfArrays = require('./data/array-of-arrays')

var meaningOfLife = '42'

assert(2 + 2, 4, 'test are working!')

/*
 * getType
 */

// Uncomment when ready to test
assertGetType()

function getType (thing) {
}

function assertGetType () {
  assert(getType('42'), 'string', '"42" is a string data type')
  assert(getType(data), 'object', 'data is an object')
}


/*
 * isNumber
 */

// Uncomment when ready to test
// assertIsNumber()

function isNumber (thing) {
}

function assertIsNumber () {
  assert(isNumber('42'), false, '"42" is not a number datatype')
  assert(isNumber(13), true, '13 is a number datatype')
}


/*
 * isStringNumber
 */

// Uncomment when ready to test
// assertIsStringNumber()

function isStringNumber (str) {
}

function assertIsStringNumber () {
  assert(isStringNumber('42'), true, '"42" is a string number')
  assert(isStringNumber('jsksk'), false, 'isStringNumber does not give a false positive')
}


/*
 * toNumber
 */

// Uncomment when ready to test
// assertToNumber()

function toNumber (str) {
}

function assertToNumber () {
  assert(toNumber('42'), 42, 'toNumber can convert strings to number if possible')
}


/*
 * add
 */

// Uncomment when ready to test
// assertAdd()

function add (a, b) {
}

function assertAdd () {
  assert(add(2, 3), 5, 'add successfully adds two numbers')
  assert(add(-2, 2), 0, 'add successfully adds two numbers')
}


/*
 * addStrings
 */

// Uncomment when ready to test
// assertAddStrings()

function addStrings (a, b) {
}

function assertAddStrings () {
  assert(addStrings(meaningOfLife, '10'), '52', 'addStrings can add number strings and convert them back to a string')
}


/*
 * addStringsOrNumbers
 */

// Uncomment when ready to test
// assertAddStringsOrNumbers()

function addStringsOrNumbers (a, b) {
}

function assertAddStringsOrNumbers () {
  assert(addStringsOrNumbers(2, 3), 5, 'addStringsOrNumbers can add numbers')
  assert(addStringsOrNumbers('1', '2'), '3', 'addStringsOrNumbers can add strings')
  assert(addStringsOrNumbers('10', 10), '20', 'addStringsOrNumbers can add strings and numbers (returning a string)')
}


/*
 * isEmail
 */

// Uncomment when ready to test
// assertIsEmail()

function isEmail (str) {
}

function assertIsEmail () {
  assert(isEmail('user@company.com'), true, 'isEmail detects an email')
  assert(isEmail('3333@'), false, 'isEmail does not give a false positive')
  assert(isEmail('johnny.b.good'), false, 'isEmail does not give a false positive')
}


/*
 * countIf
 */

// Uncomment when ready to test
// assertCountIf()

function countIf (testFunc, arr) {
}

function assertCountIf () {
  var isString = function (s) {
    return typeof s === 'string'
  }

  var mixedArray = [1, '21', null, Date.now(), 5, meaningOfLife, 42]
  var expectedNumberCount = 4 // do you know which 4 are numbers?
  var expectedStringCount = 2
  var numberCount = countIf(isNumber, mixedArray)
  var stringCount = countIf(isString, mixedArray)

  assert(numberCount, expectedNumberCount, 'countIf can count the numbers in an array')
  assert(stringCount, expectedStringCount, 'countIf can count the strings in an array')
}


/*
 * filter
 */

// Uncomment when ready to test
// assertFilter()

function filter (func, arr) {
}

function assertFilter () {
  var emails = filter(isEmail, data) || []
  assert(emails.length, 44, 'filter and isEmail returns the correct number of emails')
}


/*
 * map
 */

// Uncomment when ready to test
// assertMap()

function map (func, arr) {
}

function assertMap () {
  var someNumbers = [2, 4, 6]
  var expectedNumbers = [4, 8, 12]
  var timesTwo = function (num) {
    return num * 2
  }
  var actualNumbers = map(timesTwo, someNumbers) || []
  for (var i = 0; i < expectedNumbers.length; i++) {
    assert(expectedNumbers[i], actualNumbers[i], 'number mapped correctly')
  }
}


/*
 * filterStringsWithCommas
 */

var stringsWithCommas = filter(filterStringsWithCommas, data) || []

// Uncomment when ready to test
// assertFilterStringsWithCommas()

// does the string have a comma in it?
function filterStringsWithCommas (str) {
}

function assertFilterStringsWithCommas () {
  assert(stringsWithCommas.length, 62, 'filter and filterStringsWithCommas returns the correct number of commas')
}


/*
 * splitStringByCommas
 */

// Uncomment when ready to test
// assertSplitStringByCommas()

function splitStringByCommas (str) {
}

function assertSplitStringByCommas () {
  var arrayOfArrays = map(splitStringByCommas, stringsWithCommas) || []
  var matchesArrays = !!arrayOfArrays.length && arrayOfArrays.every(function (arr, i) {
    return arr.every(function (str, j) {
      return str === expectedArrayOfArrays[i][j]
    })
  })

  assert(matchesArrays, true, 'the generated array of array of strings matches the expected array')
}

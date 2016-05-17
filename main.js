var assert = require('./utils/assert')
var data = require('./data/data')
var expectedArrayOfArrays = require('./data/array-of-arrays')
var expectedFormattedDates = require('./data/formatted-dates')

var meaningOfLife = '42'

function each (func, arr) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i])
  }
}

/*
 * getType
 */

function getType (thing) {
}

assert(getType(meaningOfLife), 'string', 'meaningOfLife is a string data type')
assert(getType(data), 'object', 'data is an object')

/*
 * isNumber
 */

function isNumber (thing) {
}

assert(isNumber(meaningOfLife), false, 'meaningOfLife is not a number datatype')

/*
 * isStringNumber
 */

function isStringNumber (str) {
}

assert(isStringNumber(meaningOfLife), true, 'meaningOfLife to string number')
assert(isStringNumber('jsksk'), false, 'isStringNumber does not give a false positive')

/*
 * toNumber
 */

function toNumber (str) {
}

assert(toNumber(meaningOfLife), 42, 'toNumber can convert strings to number if possible')

/*
 * add
 */

function add (a, b) {
}

assert(add(2, 3), 5, 'add successfully adds two numbers')

/*
 * addStrings
 */

function addStrings (a, b) {
}

assert(addStrings(meaningOfLife, '10'), '52', 'addStrings can add number strings and convert them back to a string')

/*
 * addStringsOrNumbers
 */

function addStringsOrNumbers (a, b) {
}

assert(addStringsOrNumbers(2, 3), 5, 'addStringsOrNumbers can add numbers')
assert(addStringsOrNumbers('1', '2'), '3', 'addStringsOrNumbers can add strings')
assert(addStringsOrNumbers('10', 10), '20', 'addStringsOrNumbers can add strings and numbers (returning a string)')

/*
 * isEmail
 */

function isEmail (str) {
}

assert(isEmail('thedonald@makeamericagreatagain.com'), true, 'isEmail detects an email')
assert(isEmail('3333@'), false, 'isEmail does not give a false positive')
assert(isEmail('johnny.b.good'), false, 'isEmail does not give a false positive')

/*
 * countIf
 */

function countIf (testFunc, arr) {
}

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

/*
 * filter
 */

function filter (func, arr) {
}

var emails = filter(isEmail, data)
assert(emails.length, 44, 'filter and isEmail returns the correct number of emails')

/*
 * map
 */

function map (func, arr) {
}

var someNumbers = [2, 4, 6]
var expectedNumbers = [4, 8, 12]
var timesTwo = function (num) {
  return num * 2
}
var actualNumbers = map(timesTwo, someNumbers)
for (var i = 0; i < expectedNumbers.length; i++) {
  assert(expectedNumbers[i], actualNumbers[i], 'number mapped correctly')
}

/*
 * filterStringsWithCommas
 */

function filterStringsWithCommas (str) {
}

var stringsWithCommas = filter(filterStringsWithCommas, data)
assert(stringsWithCommas.length, 62, 'filter and filterStringsWithCommas returns the correct number of commas')

/*
 * splitStringByCommas
 */

function splitStringByCommas (str) {
}

var arrayOfArrays = map(splitStringByCommas, stringsWithCommas)
var matchesArrayOfArrays = arrayOfArrays.every(function (arr, i) {
  return arr.every(function (str, j) {
    return str === expectedArrayOfArrays[i][j]
  })
})

assert(matchesArrayOfArrays, true, 'the generated array of array of strings matches the expected array')

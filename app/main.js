var assert = require('../utils/assert')
var data = require('./data')
var expectedArrayOfArrays = require('./array-of-arrays')

function each (func, arr) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i])
  }
}

function getType (thing) {
  return typeof thing
}

function isNumber (thing) {
  return typeof thing === 'number'
}

function isStringNumber (str) {
  return !Number.isNaN(parseInt(str))
}

function toNumber (str) {
  return parseInt(str)
}

function add (a, b) {
  return a + b 
}

function addStrings (a, b) {
  return String(parseInt(a) + parseInt(b))
}

function addStringsOrNumbers (a, b) {
  if (isNumber(a) && isNumber(a)) {
    return add(a, b)
  } else {
    return addStrings(a, b)
  }
}

function countIf (testFunc, arr) {
  var count = 0

  for (var i = 0; i < arr.length; i++) {
    if(testFunc(arr[i])) {
      count ++
    }
  }

  return count
}

function filter (func, arr) {
  var results = []
  
  for (var i = 0; i < arr.length; i++) {
    if(func(arr[i])) {
      results.push(arr[i])
    }
  }

  return results
}

function map (func, arr) {
  var results = []

  for (var i = 0; i < arr.length; i++) {
    results.push(func(arr[i]))
  }

  return results
}

function isEmail (str) {
  return str.indexOf('@') > -1 && str.indexOf('.') > -1
}

function filterStringsWithCommas (str) {
  return str.indexOf(',') > 1 
}

function filterDates (str) {
  return str.indexOf('-') > -1 && !Number.isNaN(Date.parse(str))
}

function formatDate (dateString) {
  var date = new Date(dateString)
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

function splitStringByCommas (str) {
  return str.split(',')
}


// TESTS 

var meaningOfLife = '42'
var expectedType = 'string'

assert(getType(meaningOfLife), expectedType, 'meaningOfLife is a ' + expectedType + ' data type')
assert(getType(data), 'object', 'data is an object!?')
assert(isNumber(meaningOfLife), false, 'meaningOfLife is not a number datatype')
assert(isStringNumber(meaningOfLife), true, 'we can convert meaningOfLife to number')
assert(toNumber(meaningOfLife), 42, 'meaningOfLife as an integer') 
assert(add(2, 3), 5, 'add() can add')
assert(addStrings(meaningOfLife, '10'), '52', 'addStrings can can add strings and convert them back to a string')
assert(addStringsOrNumbers(2, 3), 5, 'addStringsOrNumbers can add number')
assert(addStringsOrNumbers('1', '2'), '3', 'addStringsOrNumbers can add numbers')
assert(addStringsOrNumbers('10', 10), '20', 'addStringsOrNumbers can add strings and numbers (returning a string)')

var mixedArray = [1, '21', null, Date.now(), 5, meaningOfLife, 42]
var expectedNumberCount = 4 // why are there 4 expected number data-types?  What are they?
var expectedStringCount = 2
var numberCount = countIf(isNumber, mixedArray)
var stringCount = countIf(function (x) { return typeof x === 'string' }, mixedArray)

assert(numberCount, expectedNumberCount, 'countIf can count the numbers in an array' )
assert(stringCount, expectedStringCount, 'countIf can count the strings in an array')
assert(isEmail('thedonald@makeamericagreatagain.com'), true, 'isEmail detects an email')
assert(isEmail('3333@'), false, 'isEmail does not give a false positive')

var emails = filter(isEmail, data)
assert(emails.length, 43, 'The filter function returns the correct number of emails' )

var stringsWithCommas = filter(filterStringsWithCommas, data)
assert(stringsWithCommas.length, 62, 'filterStringsWithCommas return the correct number of commas')

var arrayOfArrays = map(splitStringByCommas, stringsWithCommas)
var matchesExpected = arrayOfArrays.every(function (arr, i) {
  return arr.every(function (str, j) {
    return str === expectedArrayOfArrays[i][j]
  })
})

assert(matchesExpected, true, 'the generated array of array of strings maches the expected array')  

var dates = filter(filterDates, data)
var formattedDates = map(formatDate, dates)


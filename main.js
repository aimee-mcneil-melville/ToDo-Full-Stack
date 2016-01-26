var assert = require('./utils/assert')
var data = require('./data/data')
var expectedArrayOfArrays = require('./data/array-of-arrays')
var expectedFormattedDates = require('./data/formatted-dates')

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
  return !Number.isNaN(parseInt(str, 10))
}

function toNumber (str) {
  return parseInt(str, 10)
}

function add (a, b) {
  return a + b 
}

function addStrings (a, b) {
  return String(parseInt(a, 10) + parseInt(b, 10))
}

function addStringsOrNumbers (a, b) {
  if (isNumber(a) && isNumber(a)) {
    return add(a, b)
  } else {
    return addStrings(a, b)
  }
}

function isEmail (str) {
  return str.indexOf('@') > -1 && str.indexOf('.') > -1
}

function isDate (str) {
  return str.indexOf('-') > -1 && !Number.isNaN(Date.parse(str))
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

function filterStringsWithCommas (str) {
  return str.indexOf(',') > 1 
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
assert(isStringNumber('jsksk'), false, 'isStringNumber does not give a false positive')
assert(toNumber(meaningOfLife), 42, 'toNumber can convert strings to number if possible') 
assert(add(2, 3), 5, 'add() can add')
assert(addStrings(meaningOfLife, '10'), '52', 'addStrings can add strings and convert them back to a string')
assert(addStringsOrNumbers(2, 3), 5, 'addStringsOrNumbers can add numbers')
assert(addStringsOrNumbers('1', '2'), '3', 'addStringsOrNumbers can add numbers')
assert(addStringsOrNumbers('10', 10), '20', 'addStringsOrNumbers can add strings and numbers (returning a string)')

var mixedArray = [1, '21', null, Date.now(), 5, meaningOfLife, 42]
var expectedNumberCount = 4 // why are there 4 expected number data-types?  What are they?
var expectedStringCount = 2
var numberCount = countIf(isNumber, mixedArray)
var stringCount = countIf(function (x) { return typeof x === 'string' }, mixedArray)

assert(numberCount, expectedNumberCount, 'countIf can count the numbers in an array' )
assert(stringCount, expectedStringCount, 'countIf can count the strings in an array')

var anISO8601String = "2015-11-15 04:30:11 +1300"
assert(isEmail('thedonald@makeamericagreatagain.com'), true, 'isEmail detects an email')
assert(isEmail('3333@'), false, 'isEmail does not give a false positive')
assert(isDate(anISO8601String), true, 'isDate identifies ISO8601 Date and Time')
assert(isDate('200E-ii:iE'), false, 'isDate does not give a false positive')
assert(formatDate(anISO8601String), "15/11/2015", 'formatDate converts a date to dd/mm/yyyy format')
var emails = filter(isEmail, data)
assert(emails.length, 44, 'filter and isEmail returns the correct number of emails' )

var stringsWithCommas = filter(filterStringsWithCommas, data)
assert(stringsWithCommas.length, 62, 'filter and filterStringsWithCommas returns the correct number of commas')

var dates = filter(isDate, data)
assert(dates.length, 51, 'filter and isDate return the correct number of dates from data')

var formattedDates = map(formatDate, dates)
var matchesFormattedDates = formattedDates.every(function (d, i) {
  console.log(d, expectedFormattedDates[i])
  return d === expectedFormattedDates[i]
})

assert(matchesFormattedDates, true, 'formatDate and map correctly format dates') 

var arrayOfArrays = map(splitStringByCommas, stringsWithCommas)
var matchesArrayOfArrays = arrayOfArrays.every(function (arr, i) {
  return arr.every(function (str, j) {
    return str === expectedArrayOfArrays[i][j]
  })
})

assert(matchesArrayOfArrays, true, 'the generated array of array of strings matches the expected array') 





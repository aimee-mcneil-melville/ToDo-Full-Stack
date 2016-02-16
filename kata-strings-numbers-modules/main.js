var assert = require('./utils/assert')
var data = require('./data/data')
var expectedArrayOfArrays = require('./data/array-of-arrays')
var expectedFormattedDates = require('./data/formatted-dates')
// module.exports = {
// 	filter: require('./utils/filter') //put in top of main
// }

function each (func, arr) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i])
  }
}

function getType (thing) {
	return expectedType = typeof data
}

function isNumber (thing) {
	return typeof thing === 'number'
} 

assert(isNumber(meaningOfLife), false, 'meaningOfLife is not a number datatype')

function isStringNumber (str) {
	if !Number.isNaN(parseInt(str, 10)) 
}

assert(isStringNumber(meaningOfLife), true, 'we can convert meaningOfLife to number')
assert(isStringNumber('jsksk'), false, 'isStringNumber does not give a false positive')

function toNumber (str) {
	return parseInt(str, 10)
}
assert(toNumber(meaningOfLife), 42, 'toNumber can convert strings to number if possible') 

function add (a, b) {
	return ( a + b)
}
assert(add(2, 3), 5, 'add() can add')


function addStrings (a, b) {
	return String(parseInt(a, 10) + parseInt(b, 10))
}
assert(addStrings(meaningOfLife, '10'), '52', 'addStrings can add strings and convert them back to a string')


function addStringsOrNumbers (a, b) {
	return a + b
}
assert(addStringsOrNumbers(2, 3), 5, 'addStringsOrNumbers can add numbers')

function isEmail (str) {
var vodka = str.indexOf('@')
	if (vodka === 0) {
		return false
	} else if (vodka === str.length-1) {
		return false
	} else {
		return true
	}
}
assert(isEmail('thedonald@makeamericagreatagain.com'), true, 'isEmail detects an email')
assert(isEmail('3333@'), false, 'isEmail does not give a false positive')

function isDate (str) {
	if (isNaN(Date.parse(str))) {
		return false
	} else {
		return true
	}
}
assert(isDate(anISO8601String), true, 'isDate identifies ISO8601 Date and Time')
assert(isDate('200E-ii:iE'), false, 'isDate does not give a false positive')


function countIf (testFunc, arr) {
	var count = 0;
	//start counter at zero
	for (var i = 0; i < arr.length; i++) {
		if(testFunc(arr[i])) {
			count++
		}
	}
	return count
}

assert(numberCount, expectedNumberCount, 'countIf can count the numbers in an array' )
assert(stringCount, expectedStringCount, 'countIf can count the strings in an array')
var numberCount = countIf(isNumber, mixedArray)
var stringCount = countIf(function (x) { return typeof x === 'string' }, mixedArray)
var mixedArray = [1, '21', null, Date.now(), 5, meaningOfLife, 42]
var expectedNumberCount = 4 // why are there 4 expected number data-types?  What are they?
var expectedStringCount = 2

function filter (func, arr) {
	//func == isEmail, arr == testArray
	var results = []
	for (var i = 0; i < arr.length; i++) {
	if (func(arr[i])) {
		// console.log('arr[i]', arr[i])
		// var test = func(arr[i])  //is Email(arr[i])
		// console.log('test', test)
		// if (test) {
			results.push(arr[i]) //no else required
		}
	}
	return results;	
}
var emails = filter(isEmail, testArray)

function map (func, arr) {
	var results = []
	for (var i = 0; i < arr.length; i++) {
		results.push(func(arr[i]))
	}
	return results
}

var matchesFormattedDates = formattedDates.every(function (d, i) {
  console.log(d, expectedFormattedDates[i])
  return d === expectedFormattedDates[i]
})

// function filterStringsWithCommas (str) {
// 	var results= []
// 	var test = func(str[i]) 
// 		console.log(" , ")
// }

var stringsWithCommas = filter(filterStringsWithCommas, data)
assert(stringsWithCommas.length, 62, 'filter and filterStringsWithCommas returns the correct number of commas')

function formatDate (dateString) {
//doesn't work
}
var formattedDates = map(formatDate, dates)
function splitStringByCommas (str) {

}
var arrayOfArrays = map(splitStringByCommas, stringsWithCommas)
var matchesArrayOfArrays = arrayOfArrays.every(function (arr, i) {
  return arr.every(function (str, j) {
    return str === expectedArrayOfArrays[i][j]
  })
})

// TESTS 

var meaningOfLife = '42'
var expectedType = 'string'

assert(getType(meaningOfLife), expectedType, 'meaningOfLife is a ' + expectedType + ' data type')
assert(getType(data), 'object', 'data is an object!?')

assert(addStringsOrNumbers('1', '2'), '3', 'addStringsOrNumbers can add numbers')
assert(addStringsOrNumbers('10', 10), '20', 'addStringsOrNumbers can add strings and numbers (returning a string)')




var anISO8601String = "2015-11-15 04:30:11 +1300"



assert(formatDate(anISO8601String), "15/11/2015", 'formatDate converts a date to dd/mm/yyyy format')
var emails = filter(isEmail, data)
assert(emails.length, 44, 'filter and isEmail returns the correct number of emails' )



var dates = filter(isDate, data)
assert(dates.length, 51, 'filter and isDate return the correct number of dates from data')



assert(matchesFormattedDates, true, 'formatDate and map correctly format dates') 



assert(matchesArrayOfArrays, true, 'the generated array of array of strings matches the expected array') 





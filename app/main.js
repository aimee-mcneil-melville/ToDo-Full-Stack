var assert = require('../utils/assert')
var data = require('./data')


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

function filterEmails (str) {
  return str.indexOf('@') > -1 && str.indexOf('.')
}

function filterStringsWithCommas (str) {
  return str.indexOf(',') > 1 
}





var emails = filter(filterEmails, data)
 assert(emails.length, 44, 'The filter function returns the correctnumber of emails' )

var stringsWithCommas = filter(filterStringswithCommas, data)









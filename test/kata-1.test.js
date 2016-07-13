var test = require('ava')
var kata1 = require('../kata/kata-1.js')

test('makeObject makes objects', function (t) {
  var expected = { a: 1 }
  var actual = kata1.makeObject('a', 1)
  t.deepEqual(actual, expected)
})

test('getValue gets values from objects', function (t) {
  var expected = 1
  var actual = kata1.getValue({ a: 1 }, 'a')
  t.equal(actual, expected)
})

test('ageOneYear adds 1 year to the age property of an object', function (t) {
  var mickey = { 
    name: 'Mickey Mouse',
    age: 64,
    email: 'mickey@disney.com'
  }
  var expected = {
    name: 'Mickey Mouse',
    age: 65,
    email: 'mickey@disney.com'
  }
  kata1.ageOneYear(mickey)
  t.deepEqual(mickey, expected)
})

test('deleteProp deletes properties', function (t) {
  var mickey = { 
    name: 'Mickey Mouse',
    age: 64,
    email: 'mickey@disney.com'
  }
  var expected = {
    name: 'Mickey Mouse',
    age: 64
  }
  kata1.deleteProp(mickey, 'email')
  t.deepEqual(mickey, expected)
})

test('makeArrayOfItem (SINGULAR) makes an array out of one item', function (t) {
  var expected = ['a', 'a', 'a']
  var actual = kata1.makeArrayOfItem('a', 3)
  t.deepEqual(actual, expected)
})

test('makeArrayOfItems (PLURAL) makes an array of arguments', function (t) {
  var expected = ['foo', 'bar', 'wombat', false, 99]
  var actual = kata1.makeArrayOfItems('foo', 'bar', 'wombat', false, 99)
  t.deepEqual(actual, expected)
})

test('getGreeting returns "Hello <name>"', function (t) {
  var expected = 'Hello Aardvark'
  var actual = kata1.getGreeting('Aardvark')
  t.equal(actual, expected)
})

test('returnErrorIfFalsy returns the correct Error when passed 0', function (t) {
  var expected = new Error('Oh no, an error!')
  var actual = kata1.returnErrorIfFalsy(0)
  t.deepEqual(actual, expected)
})

test('returnErrorIfFalsy(1) is undefined', function (t) {
  var expected = undefined
  var actual = kata1.returnErrorIfFalsy(1)
  t.equal(actual, expected)
})

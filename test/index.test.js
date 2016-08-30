// Consolidating all the tests into one file is NOT normal practice!
// We're more interested in getting you used to making tests pass...
// so we didn't want you to have to deal with more than one test at a time
var test = require('ava')

var getValue = require('../getValue')
var getAddress = require('../getAddress')
var getType = require('../getType')
var getValueTypes = require('../getValueTypes')
var positions = require('../positions')
var matrix = require('../matrix')
var where = require('../where')

function getContacts () {
  return [
    { id: '123', address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 },
    { id: '124', address: 'Bag End', name: 'Bilbo Baggins', age: 78 },
    { id: '125', address: 'Wayne Manor', name: 'Bruce Wayne', age: 43 },
    { id: '126', address: 'Skull Island', name: 'Dr Evil', age: 51 },
    { id: '127', address: 'Wayne Manor', name: 'Alfred', age: 78 }
  ]
}

test('getValue gets a nested object by key', function (t) {
  var contacts = {
    '123': { address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 },
    '124': { address: 'Bag End', name: 'Bilbo Baggins', age: 78 }
  }
  var expected = { address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 }
  var actual = getValue(contacts, '123')
  t.deepEqual(actual, expected)
})

test('getType returns the data type of its argument', function (t) {
  var expected = 'number'
  var actual = getType(123)
  t.is(actual, expected)
})

test('getType returns the expected data types', function (t) {
  var arrayWithDifferentTypes = ['d', 3, function () { return 'hello' }, true, []]
  var expected = ['string', 'number', 'function', 'boolean', 'object']
  var actual = arrayWithDifferentTypes.map(getType)
  t.deepEqual(actual, expected)
})

test('getValueTypes returns the types of object properties', function (t) {
  var objWithDifferentTypes = {
    a: 'c',
    b: 2,
    c: function () { return 'hello' },
    d: false,
    e: {}
  }
  var expected = ['string', 'number', 'function', 'boolean', 'object']
  var actual = getValueTypes(objWithDifferentTypes)
  t.deepEqual(actual, expected)
})

test('getFirst & getLast', function (t) {
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  t.is(positions.getFirst(alphabet), 'a', 'getFirst gets the first item in an array')
  t.is(positions.getLast(alphabet), 'e', 'getLast gets the last item in an array')
  t.is(positions.getLast(alphabet.splice(0, 3)), 'c', 'getLast always gets the last item in an array')
})

test('map and getAddress return the address property from objects in an array', function (t) {
  var contacts = getContacts()
  var expected = [ '742 Evergreen Terrace', 'Bag End', 'Wayne Manor', 'Skull Island', 'Wayne Manor']
  var actual = contacts.map(getAddress)
  t.deepEqual(actual, expected)
})

test('creating and updating matrices', function (t) {
  var expected = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
  ]
  var actual = matrix.getMatrix(3)
  t.deepEqual(actual, expected)
})

test('updateMatrix can change the value at specified coordinates', function (t) {
  var initialMatrix = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
  ]
  var expected = [
    [ 0, 0, 0 ],
    [ 0, 0, 1 ],
    [ 0, 0, 0 ]
  ]
  var actual = matrix.updateMatrix(initialMatrix, [1, 2], 1)
  t.deepEqual(actual, expected)
})

test('find finds the first matching object in the array', function (t) {
  var contacts = getContacts()
  var expected = { id: '125', address: 'Wayne Manor', name: 'Bruce Wayne', age: 43 }
  var actual = find(contacts, { address: 'Wayne Manor' })
  t.deepEqual(actual, expected)
})

test('where finds an object by id in an array', function (t) {
  var contacts = getContacts()
  var expected = [{ id: '123', address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 }]
  var actual = where(contacts, { id: '123' })
  t.deepEqual(actual, expected)
})

test('where finds an object by property', function (t) {
  var contacts = getContacts()
  var expected = [{ id: '126', address: 'Skull Island', name: 'Dr Evil', age: 51 }]
  var actual = where(contacts, { address: 'Skull Island' })
  t.deepEqual(actual, expected)
})

test('where returns multile correct results', function (t) {
  var contacts = getContacts()
  var expected = 2
  var actual = where(contacts, { age: 78 }).length
  t.equal(actual, expected)
})

test('where finds objects with two search properties', function (t) {
  var contacts = getContacts()
  var expected = [{ id: '127', address: 'Wayne Manor', name: 'Alfred', age: 78 }]
  var actual = where(contacts, { age: 78, address: 'Wayne Manor' })
  t.deepEqual(actual, expected)
})

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
var find = require('../find')

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
  // Arrange
  var contacts = {
    '123': { address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 },
    '124': { address: 'Bag End', name: 'Bilbo Baggins', age: 78 }
  }
  var expected = { address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 }

  // Act
  var actual = getValue(contacts, '123')

  // Assert
  t.deepEqual(actual, expected)
})

test('getType returns correct data type for number', function (t) {
  // Arrange
  var expected = 'number'

  // Act
  var actual = getType(123)

  // Assert
  t.is(actual, expected)
})

test('getType returns correct data type for string', function (t) {
  // Arrange
  var expected = 'string'

  // Act
  var actual = getType('123') // Notice the difference between '123' and 123

  // Assert
  t.is(actual, expected)
})

test('getType returns the expected data types', function (t) {
  // Arrange
  var arrayWithDifferentTypes = ['d', 3, function () { return 'hello' }, true, []]
  var expected = ['string', 'number', 'function', 'boolean', 'object']

  // Act
  var actual = arrayWithDifferentTypes.map(getType)

  // Assert
  t.deepEqual(actual, expected)
})

test('getValueTypes returns the types of object properties', function (t) {
  // Arrange
  var objWithDifferentTypes = {
    a: 'c',
    b: 2,
    c: function () { return 'hello' },
    d: false,
    e: {}
  }
  var expected = ['string', 'number', 'function', 'boolean', 'object']

  // Act
  var actual = getValueTypes(objWithDifferentTypes)

  // Assert
  t.deepEqual(actual, expected)
})

test('getFirst gets the first item in an array', function (t) {
  // Arrange
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = 'a'

  // Act
  var actual = positions.getFirst(alphabet)

  // Assert
  t.is(actual, expected)
})

test('getLast gets the last item in a small array', function (t) {
  // Arrange
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = 'e'

  // Act
  var actual = positions.getLast(alphabet)

  // Assert
  t.is(actual, expected)
})

test('getLast gets the last item in a long array', function (t) {
  // Arrange
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  var expected = 'z'

  // Act
  var actual = positions.getLast(alphabet)

  // Assert
  t.is(actual, expected)
})

test('map and getAddress return the address property from objects in an array', function (t) {
  // Arrange
  var contacts = getContacts()
  var expected = [ '742 Evergreen Terrace', 'Bag End', 'Wayne Manor', 'Skull Island', 'Wayne Manor']

  // Act
  var actual = contacts.map(getAddress)

  // Assert
  t.deepEqual(actual, expected)
})

test('getMatrix creates 3x3 matrix', function (t) {
  // Arrange
  var expected = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
  ]

  // Act
  var actual = matrix.getMatrix(3)

  // Assert
  t.deepEqual(actual, expected)
})

test('getMatrix creates 4x4 matrix', function (t) {
  // Arrange
  var expected = [
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ]
  ]

  // Act
  var actual = matrix.getMatrix(4)

  // Assert
  t.deepEqual(actual, expected)
})

test('updateMatrix can change the value at specified coordinates', function (t) {
  // Arrange
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

  // Act
  var actual = matrix.updateMatrix(initialMatrix, [1, 2], 1)

  // Assert
  t.deepEqual(actual, expected)
})

test('find finds the first matching object in the array', function (t) {
  // Arrange
  var contacts = getContacts()
  var expected = { id: '125', address: 'Wayne Manor', name: 'Bruce Wayne', age: 43 }

  // Act
  var actual = find(contacts, { address: 'Wayne Manor' })

  // Assert
  t.deepEqual(actual, expected)
})

test('where finds an object by id in an array', function (t) {
  // Arrange
  var contacts = getContacts()
  var expected = [{ id: '123', address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 }]

  // Act
  var actual = where(contacts, { id: '123' })

  // Assert
  t.deepEqual(actual, expected)
})

test('where finds an object by property', function (t) {
  // Arrange
  var contacts = getContacts()
  var expected = [{ id: '126', address: 'Skull Island', name: 'Dr Evil', age: 51 }]

  // Act
  var actual = where(contacts, { address: 'Skull Island' })

  // Assert
  t.deepEqual(actual, expected)
})

test('where returns multile correct results', function (t) {
  // Arrange
  var contacts = getContacts()
  var expected = 2

  // Act
  var actual = where(contacts, { age: 78 }).length

  // Assert
  t.is(actual, expected)
})

test('where finds objects with two search properties', function (t) {
  // Arrange
  var contacts = getContacts()
  var expected = [{ id: '127', address: 'Wayne Manor', name: 'Alfred', age: 78 }]

  // Act
  var actual = where(contacts, { age: 78, address: 'Wayne Manor' })

  // Assert
  t.deepEqual(actual, expected)
})


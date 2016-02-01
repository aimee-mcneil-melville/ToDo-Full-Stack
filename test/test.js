var kata = require('../')
var test = require('tape')
// var map = require('your-library-name').map
// var utils = require('your-library-name')

var objWithDifferentTypes = {
  a: 'c',
  b: 2,
  c: function () {
    return 'hello'
  },
  d: false,
  e: {}
}

var arrayWithDifferentTypes = ['d', 3, objWithDifferentTypes.c, true, []]

var coordinates = [ [0, 0], [10, 0], [10, 10], [0, 10], [5, 5] ]
var expectedXCoords = [ 0, 10, 10, 0, 5 ]
var expectedYCoords = [ 0, 0, 10, 10, 5 ]

var keys = ['a', 'b', 'c', 'd', 'e']
var expectedTypes = [ 'string', 'number', 'function', 'boolean', 'object' ]


test('reading nested objects and arrays', function (t) {
  
  t.equal(getType(123), 'number', 'getType returns the data type of its argument')
  
  // var itemTypes = map(kata.getType, arrayWithDifferentTypes) // try using your own map function
  var itemTypes = arrayWithDifferentTypes.map(kata.getType)
  t.deepEqual(itemTypes, expectedTypes)
  
  var valueTypes = kata.getValueTypes(objWithDifferentTypes)
  t.deepEqual(valueTypes, expectedTypes, "getValueTypes returns the types of an object's values")
  
  t.equal(kata.getFirst(keys), 'a', 'getFirst gets the first item in an array')
  t.equal(kata.getLast(keys), 'e', 'getLast gets the the last item in an array')

  var xCoords = coordinates.map(kata.getFirst)
  var yCoords = coordinates.map(kata.getLast)
  // var xCoords = map(kata.getFirst, coordinates)
  // var yCoords = map(kata.getLast, coordinates)

  t.deepEqual(xCoords, expectedXCoords, 'getFirst gets the 
  
  
  t.end()

})

contactsObj = { 
  '123': { address: '742 Evergreen Terrace', name: 'Marge Simpson' },
  '124': { address: 'Bag End', name: 'Bilbo Baggins' },
  '125': { address: 'Wayne Manor', name: 'Bruce Wayne' },
  '126': { address: 'Skull Island', name: 'Dr Evil' }
}

var contacts = [
  { id: '123', address: '742 Evergreen Terrace', name: 'Marge Simpson' },
  { id:  '124', address: 'Bag End', name: 'Bilbo Baggins' },
  { id: '125', address: 'Wayne Manor', name: 'Bruce Wayne' },
  { id: '126', address: 'Skull Island', name: 'Dr Evil' }
]

var expectedAddresses = [ '742 Evergreen Terrace', 'Bag End', 'Wayne Manor', 'Skull Island' ]

var marge =  { address: '742 Evergreen Terrace', name: 'Marge Simpson' }

test('', function (t) {
  
  t.deepEqual(kata.getValue(contactsObj, '123'), marge, 'getValue gets a nested object by key')

  var addresses = map(kata.getAddress, contacts)
  t.deepEqual(addresses, expectedAddressesm 'map and getAddress return the address prpoerty from objects in an array')

  var testMarge = kata.where(contacts, { id: '123' })
  t.deepEqual(testMarge, marge, 'where() finds an object by id in an array')

  t.end()
})

var expectedMatrix4by4 = [
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ]
]

test('creating and updating matrices', function (t) {
  var matrix = kata.getMatrix(4) 
  t.equal(matrix.length, 4, 'getMatrix creates a matrix of the correct the length')
  
  each(
    function (row, i) {
      t.deepEqual(row, expectedMatrix4by4[0], 'rows in the created matrix have for the structure: ' + i)
    }, 
    matrix
  )

  var updatedMatrix = kata.updateMatrix(matrix, [1, 3], 1) 
  t.equal(updatedMatrix[1][3], 1, 'updateMatrix can change the value at specified coordinates')



})

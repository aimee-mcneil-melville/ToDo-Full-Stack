// main
var kata = require('../')
var test = require('tape')
// var map = require('your-library-name').map

// test data
var arrayWithDifferentTypes = ['d', 3, function () { return 'hello' }, true, []]
var objWithDifferentTypes = {
  a: 'c',
  b: 2,
  c: function () {
    return 'hello'
  },
  d: false,
  e: {}
}
var keys = ['a', 'b', 'c', 'd', 'e']
var expectedTypes = [ 'string', 'number', 'function', 'boolean', 'object' ]

var coordinates = [ [0, 0], [10, 0], [10, 10], [0, 10], [5, 5] ]
var expectedXCoords = [ 0, 10, 10, 0, 5 ]
var expectedYCoords = [ 0, 0, 10, 10, 5 ]

// begin test
test('reading nested objects and arrays', function (t) {
  
  t.equal(kata.getType(123), 'number', 'getType returns the data type of its argument')
  
  // var itemTypes = map(kata.getType, arrayWithDifferentTypes) // try using your own map function
  var itemTypes = arrayWithDifferentTypes.map(kata.getType)
  t.deepEqual(itemTypes, expectedTypes, 'getType returns the expected data types')
  
  var valueTypes = kata.getValueTypes(objWithDifferentTypes)
  t.deepEqual(valueTypes, expectedTypes, "getValueTypes returns the types of an object's values")
  
  t.equal(kata.getFirst(keys), 'a', 'getFirst gets the first item in an array')
  t.equal(kata.getLast(keys), 'e', 'getLast gets the the last item in an array')

  var xCoords = coordinates.map(kata.getFirst)
  var yCoords = coordinates.map(kata.getLast)
  // use the below alternatives with your own map function
  // var xCoords = map(kata.getFirst, coordinates)
  // var yCoords = map(kata.getLast, coordinates)

  t.deepEqual(xCoords, expectedXCoords, 'getFirst gets the first item from a series of arrays') 
  t.deepEqual(yCoords, expectedYCoords, 'getLast gets the last item from a series of arrays')

  t.end()

})
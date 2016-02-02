// main 
var kata = require('../')
var test = require('tape')
// var map = require('your-library-name').map
// var utils = require('your-library-name')

var expectedMatrix4by4 = [
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ]
]

test('creating and updating matrices', function (t) {
  var matrix = kata.getMatrix(4) 
  t.equal(matrix.length, 4, 'getMatrix creates a matrix with the correct number of rows')
  
  matrix.forEach(function (row, i) {
  	t.deepEqual(row, expectedMatrix4by4[i], 'the created row equals the expected row at index: ' + i)
  })

  var updatedMatrix = kata.updateMatrix(matrix, [1, 3], 1) 
  t.equal(updatedMatrix[1][3], 1, 'updateMatrix can change the value at specified coordinates')

  t.end()

})
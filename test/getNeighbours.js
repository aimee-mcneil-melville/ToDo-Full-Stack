var test = require('tape')
var getNeighbours = require('../getNeighbours')
var createBoard = require('../conway.js').createBoard

test('getNeighbours', function (t) {
  var board = createBoard(10)
  t.equal(getNeighbours(2, 2, board).length, 8)
  t.equal(getNeighbours(0, 0, board).length, 3)
  t.end()
})

var test = require('tape')

var countAliveNeighbours = require('../countAliveNeighbours')
var createBoard = require('../createBoard')

test('countAliveNeighbours', function (t) {
  var board = createBoard(10)
  board[0][0] = true
  board[0][1] = true
  board[0][2] = true
  board[1][0] = true
  board[2][0] = true
  board[2][1] = true
  board[2][2] = true
  board[1][2] = true
  board[1][1] = true
  t.equal(countAliveNeighbours(1, 1, board), 8)
  t.equal(countAliveNeighbours(0, 0, board), 3)
  t.end()
})

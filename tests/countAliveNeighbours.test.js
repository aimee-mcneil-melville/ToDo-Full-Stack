<<<<<<< HEAD
var countAliveNeighbours = require('../countAliveNeighbours')
var createBoard = require('../createBoard')

test('countAliveNeighbours', function () {
=======
var test = require('tape')

var countAliveNeighbours = require('../countAliveNeighbours')
var createBoard = require('../createBoard')

test('countAliveNeighbours', function (t) {
>>>>>>> parent of e6f1255... Bring tests back
  var board = createBoard(10)
  board[0][0] = true
  board[0][1] = true
  board[0][2] = true
  board[1][0] = true
  board[2][0] = true
  board[2][1] = true
  board[2][2] = false
  board[1][2] = true
  board[1][1] = false
<<<<<<< HEAD

  expect(countAliveNeighbours(1, 1, board)).toBe(7)
  expect(countAliveNeighbours(0, 0, board)).toBe(2)
=======
  t.equal(countAliveNeighbours(1, 1, board), 7)
  t.equal(countAliveNeighbours(0, 0, board), 2)
  t.end()
>>>>>>> parent of e6f1255... Bring tests back
})

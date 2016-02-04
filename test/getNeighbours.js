var test = require('tape')
var getNeighbours = require('../getNeighbours')
var createBoard = require('../createBoard.js')

test('getNeighbours in corner', function (t) {
  var board = createBoard(10)
  board[0][1] = 3
  board[1][0] = 5
  board[1][1] = 11
  var neighbours = getNeighbours(0, 0, board)
  t.equal(neighbours.reduce(function (sum, val) { return sum + val }, 0), 19)
  t.end()
})

test('getNeighbours in middle', function (t) {
  var board = createBoard(10)
  var total = 0
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (i === 1 && j === 1) continue
      var rando = Math.random()
      total += rando
      board[i][j] = rando
    }
  }
  var neighbours = getNeighbours(1, 1, board)
  t.equal(neighbours.reduce(function (sum, val) { return sum + val }, 0), total)
  t.end()
})
//What about a cell on the edge? 

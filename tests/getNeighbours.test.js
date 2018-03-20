var getNeighbours = require('../getNeighbours')
var createBoard = require('../createBoard.js')

test('getNeighbours in corner', function () {
  var board = createBoard(10)
  board[0][0] = 1000000
  board[0][1] = 3
  board[1][0] = 5
  board[1][1] = 11
  var expected = 19

  var neighbours = getNeighbours(0, 0, board)
  var actual = neighbours.reduce(function (sum, val) { return sum + val }, 0)

  expect(actual).toBe(expected)
})

test('getNeighbours in middle', function () {
  var board = createBoard(10)
  var total = 0
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
        board[i][j] = "I'm the central cell!"
        continue
      }
      var rando = Math.random()
      total += rando
      board[i][j] = rando
    }
  }
  var neighbours = getNeighbours(1, 1, board)
  var actual = neighbours.reduce(function (sum, val) { return sum + val }, 0)

  expect(actual).toBe(total)
})

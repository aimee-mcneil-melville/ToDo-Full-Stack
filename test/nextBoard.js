var test = require('tape')
var createBoard = require('../createBoard');
var nextBoard = require('../nextBoard')

test('nextBoard', function (t) {
  (function () {
    var board = createBoard(10)
    board[0][0] = true
    var newBoard = nextBoard(board)
    t.false(newBoard[0][0], 'Example one is correct')
  })()
  ;(function () {
    var board = createBoard(10)
    board[1][1] = true
    board[1][2] = true
    board[2][1] = true
    board[2][2] = true
    var newBoard = nextBoard(board)
    t.true(newBoard[2][2], 'Example two is correct')
    t.true(newBoard[1][1], 'Example two is correct')
    t.true(newBoard[2][1], 'Example two is correct')
    t.true(newBoard[1][2], 'Example two is correct')
  })()
  ;(function () {
    var board = createBoard(10)
    board[0][0] = true
    board[0][1] = true
    board[1][0] = true
    var newBoard = nextBoard(board)
    t.true(newBoard[1][1], 'Example three is correct')
  })()
  t.end()
})

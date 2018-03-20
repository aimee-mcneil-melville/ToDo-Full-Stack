<<<<<<< HEAD
var createBoard = require('../createBoard');
var nextBoard = require('../nextBoard')

test('nextBoard', function () {
  (function() {
    var board = createBoard(10)
    var newBoard = nextBoard(board)
    expect(board).not.toBe(newBoard)
=======
var test = require('tape')
var createBoard = require('../createBoard');
var nextBoard = require('../nextBoard')

test('nextBoard', function (t) {
  (function() {
    var board = createBoard(10)
    var newBoard = nextBoard(board)
    t.not(newBoard, board, 'nextBoard returns a new array and not the array passed in')
>>>>>>> parent of e6f1255... Bring tests back
  })()
  ;(function () {
    var board = createBoard(10)
    board[0][0] = true
    var newBoard = nextBoard(board)
<<<<<<< HEAD
    expect(newBoard[0][0]).toBeFalsy()
=======
    t.false(newBoard[0][0], 'Example one is correct')
>>>>>>> parent of e6f1255... Bring tests back
  })()
  ;(function () {
    var board = createBoard(10)
    board[1][1] = true
    board[1][2] = true
    board[2][1] = true
    board[2][2] = true
    var newBoard = nextBoard(board)
<<<<<<< HEAD
    expect(newBoard[2][2]).toBeTruthy()
    expect(newBoard[1][1]).toBeTruthy()
    expect(newBoard[2][1]).toBeTruthy()
    expect(newBoard[1][2]).toBeTruthy()
=======
    t.true(newBoard[2][2], 'Example two is correct')
    t.true(newBoard[1][1], 'Example two is correct')
    t.true(newBoard[2][1], 'Example two is correct')
    t.true(newBoard[1][2], 'Example two is correct')
>>>>>>> parent of e6f1255... Bring tests back
  })()
  ;(function () {
    var board = createBoard(10)
    board[0][0] = true
    board[0][1] = true
    board[1][0] = true
    var newBoard = nextBoard(board)
<<<<<<< HEAD

    expect(newBoard[1][1]).toBeTruthy()
  })()
=======
    t.true(newBoard[1][1], 'Example three is correct')
  })()
  t.end()
>>>>>>> parent of e6f1255... Bring tests back
})

var createBoard = require('../createBoard');
var nextBoard = require('../nextBoard')

test('nextBoard', function () {
  (function() {
    var board = createBoard(10)
    var newBoard = nextBoard(board)
    expect(board).not.toBe(newBoard)
  })()
  ;(function () {
    var board = createBoard(10)
    board[0][0] = true
    var newBoard = nextBoard(board)
    expect(newBoard[0][0]).toBeFalsy()
  })()
  ;(function () {
    var board = createBoard(10)
    board[1][1] = true
    board[1][2] = true
    board[2][1] = true
    board[2][2] = true
    var newBoard = nextBoard(board)
    expect(newBoard[2][2]).toBeTruthy()
    expect(newBoard[1][1]).toBeTruthy()
    expect(newBoard[2][1]).toBeTruthy()
    expect(newBoard[1][2]).toBeTruthy()
  })()
  ;(function () {
    var board = createBoard(10)
    board[0][0] = true
    board[0][1] = true
    board[1][0] = true
    var newBoard = nextBoard(board)
    expect(newBoard[1][1]).toBeTruthy()
  })()
})

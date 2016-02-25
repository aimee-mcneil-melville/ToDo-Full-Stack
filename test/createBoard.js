var test = require('tape')

var createBoard = require('../createBoard');
//How would you improve this test? What types should be in the board?
test('createBoard', function (t) {
  var length = 5
  var board = createBoard(length)
  t.equal(board.length, length, 'dimension 1 of the array is the length passed into the constructor')
  t.equal(board[0].length, length, 'dimension 2 of the array is the length passed into the constructor')
  t.end()
})

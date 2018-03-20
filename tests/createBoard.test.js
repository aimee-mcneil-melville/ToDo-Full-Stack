<<<<<<< HEAD
var createBoard = require('../createBoard');
//How would you improve this test? What types should be in the board?
test('createBoard returns boards with the correct dimensions', function () {
  for (var i = 1; i < 5; i++) {
    var board = createBoard(i)

    expect(board).toHaveLength(i)
    expect(board[0]).toHaveLength(i)
  }
})

test('each row of the returned board is a different array', function() {
  var board = createBoard(2)

  expect(board[0]).not.toBe(board[1])
=======
var test = require('tape')

var createBoard = require('../createBoard');
//How would you improve this test? What types should be in the board?
test('createBoard returns boards with the correct dimensions', function (t) {
  for (var i = 1; i < 5; i++) {
    var board = createBoard(i)
    t.equal(board.length, i, 'dimension 1 of the array is the length passed into the constructor')
    t.equal(board[0].length, i, 'dimension 2 of the array is the length passed into the constructor')
  }
  t.end()
})

test('each row of the returned board is a different array', function(t) {
  var board = createBoard(2)
  t.notEqual(board[0], board[1])
  t.end()
>>>>>>> parent of e6f1255... Bring tests back
})

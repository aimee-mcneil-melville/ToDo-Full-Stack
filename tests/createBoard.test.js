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
})

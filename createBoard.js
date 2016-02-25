function createBoard(size) {
  var board = []

  for (var i = 0; i < size; i++) {
      var row = []

    for (var j = 0; j < size; j++) {
      row.push(board)
    }
      board.push(row)
  }
  console.log(board)
  return board
}

module.exports = createBoard


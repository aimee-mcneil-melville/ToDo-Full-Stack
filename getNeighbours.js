const indicesOutOfBounds = require('./indicesOutOfBounds')

function getNeighbours (cellRow, cellColumn, board) {
  const arr = []
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (j == 0 && i == 0) continue
      if (!indicesOutOfBounds(cellRow + i, cellColumn + j, board)) arr.push(board[cellRow + i][cellColumn + j])
    }
  }
  return arr
}

module.exports = getNeighbours

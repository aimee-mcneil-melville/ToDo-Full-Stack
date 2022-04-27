const indicesAreOutOfBounds = require('./indicesAreOutOfBounds')

function getNeighbours (cellRow, cellColumn, board) {
  return [
    getTargetCell(cellRow - 1, cellColumn - 1, board),  // tl
    getTargetCell(cellRow - 1, cellColumn    , board),  // tm
    getTargetCell(cellRow - 1, cellColumn + 1, board),  // tr

    getTargetCell(cellRow    , cellColumn - 1, board),  // l
    // m
    getTargetCell(cellRow    , cellColumn + 1, board),  // r

    getTargetCell(cellRow + 1, cellColumn - 1, board),  // bl
    getTargetCell(cellRow + 1, cellColumn    , board),  // bm
    getTargetCell(cellRow + 1, cellColumn + 1, board),  // br
  ].filter(item => item != null)
}

function getTargetCell(cellRow, cellColumn, board) {
  return !indicesAreOutOfBounds(cellRow, cellColumn, board) ? board[cellRow][cellColumn] : null
}

module.exports = getNeighbours

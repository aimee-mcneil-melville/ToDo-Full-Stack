const nextCellState = require('./nextCellState')
const countAliveNeighbours = require('./countAliveNeighbours')

function nextBoard (currentBoard) {
  return currentBoard.map((row, cellRow) => row.map((cell, cellColumn) => nextCellState(cell, countAliveNeighbours(cellRow, cellColumn, currentBoard))))
}

module.exports = nextBoard

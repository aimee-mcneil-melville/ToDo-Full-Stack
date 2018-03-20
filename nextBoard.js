const nextCellState = require('./nextCellState')
const countAliveNeighbours = require('./countAliveNeighbours')

function nextBoard (currentBoard) {
  return currentBoard.map((row, i) => {
    return row.map((cell, j) => nextCellState(cell, countAliveNeighbours(i, j, currentBoard)))
  })
}

module.exports = nextBoard

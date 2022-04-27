const getNeighbours = require('./getNeighbours')

function countAliveNeighbours (cellRow, cellColumn, board) {
  return getNeighbours(cellRow, cellColumn, board)
    .filter(cell => !!cell)
    .length
}

module.exports = countAliveNeighbours

const getNeighbours = require('./getNeighbours')

function countAliveNeighbours (cellRow, cellColumn, board) {
  return getNeighbours(cellRow, cellColumn, board).filter(el => !!el).length
}

module.exports = countAliveNeighbours

const isOverPopulated = require('./isOverPopulated')
const isUnderPopulated = require('./isUnderPopulated')
const isRessurectable = require('./isRessurectable')

function nextCellState (cellState, neighbourCount) {
  if (cellState) {
    return !isUnderPopulated(neighbourCount) && !isOverPopulated(neighbourCount)
  } else {
    return isRessurectable(neighbourCount)
  }
}

module.exports = nextCellState

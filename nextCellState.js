var overPopulated = require('./overPopulated')
var underPopulated = require('./underPopulated')
var ressurectable = require('./ressurectable')

function nextCellState(cellState, neighbourCount) {

  if (overPopulated(neighbourCount) && cellState) {
    return false
  }

  if (underPopulated(neighbourCount) && cellState) {
    return false
  }

  if (ressurectable(neighbourCount) && !cellState) {
    return true
  }

  if (!underPopulated(neighbourCount) && !overPopulated(neighbourCount) && cellState) {
    return true
  }
}

module.exports = nextCellState

const overPopulated = require('./overPopulated')
const underPopulated = require('./underPopulated')
const ressurectable = require('./ressurectable')

function nextCellState (cellState, neighbourCount) {
  return cellState
    ? !overPopulated(neighbourCount) && !underPopulated(neighbourCount)
    : ressurectable(neighbourCount)
}

module.exports = nextCellState

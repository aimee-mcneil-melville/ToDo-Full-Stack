const isOutOfBounds = require('./isOutOfBounds')

function indicesAreOutOfBounds (rowIndex, columnIndex, array) {
  return isOutOfBounds(rowIndex, array) || isOutOfBounds(columnIndex, array)
}

module.exports = indicesAreOutOfBounds

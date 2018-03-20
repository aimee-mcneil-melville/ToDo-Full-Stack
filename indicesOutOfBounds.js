const outOfBounds = require('./outOfBounds')

function indicesOutOfBounds (rowIndex, columnIndex, array) {
  return outOfBounds(rowIndex, array) || outOfBounds(columnIndex, array)
}

module.exports = indicesOutOfBounds

function outOfBounds (index, array) {
  return index < 0 || index >= array.length
}

module.exports = outOfBounds

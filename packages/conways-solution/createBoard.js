function createBoard (size) {
  return createArray(size).map(_ => createArray(size, false))
}

function createArray(size, fill = null) {
  return (new Array(size)).fill(fill)
}

module.exports = createBoard

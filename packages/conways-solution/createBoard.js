function createBoard(size) {
  let rows = []
  while (rows.length < size) {
    let cells = []
    while (cells.length < size) {
      cells.push(false)
    }
    rows.push(cells)
  }

  return rows
}

export default createBoard

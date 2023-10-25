import indicesAreOutOfBounds from './indicesAreOutOfBounds'

function getNeighbours(cellRow, cellColumn, board) {
  let result = []
  for (let y of [-1, 0, 1])
    for (let x of [-1, 0, 1]) {
      if (y === 0 && x === 0) {
        continue
      }

      let i = cellRow + y
      let j = cellColumn + x
      if (indicesAreOutOfBounds(i, j, board)) {
        continue
      }

      result.push(board[i][j])
    }

  return result
}

export default getNeighbours

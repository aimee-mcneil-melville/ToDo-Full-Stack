import isOutOfBounds from './isOutOfBounds'

function indicesAreOutOfBounds(rowIndex, columnIndex, board) {
  return (
    isOutOfBounds(rowIndex, board) ||
    isOutOfBounds(columnIndex, board[rowIndex])
  )
}

export default indicesAreOutOfBounds

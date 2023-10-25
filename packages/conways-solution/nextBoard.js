import nextCellState from './nextCellState'
import countAliveNeighbours from './countAliveNeighbours'

function nextBoard(currentBoard) {
  return currentBoard.map((row, y) =>
    row.map((cell, x) =>
      nextCellState(cell, countAliveNeighbours(y, x, currentBoard))
    )
  )
}

export default nextBoard

import createBoard from './createBoard'
import nextBoard from './nextBoard'
import displayBoard from './displayBoard'

const size = 10
const refreshInterval = 100

let board = createBoard(size)

setTimeout(() => {
  displayBoard(board)
  board = nextBoard(board)
}, refreshInterval)

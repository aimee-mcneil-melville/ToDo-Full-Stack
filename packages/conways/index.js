import createBoard from './createBoard.js'
import nextBoard from './nextBoard.js'
import displayBoard from './displayBoard.js'

const size = 10
const refreshInterval = 100

let board = createBoard(size)

setTimeout(() => {
  displayBoard(board)
  board = nextBoard(board)
}, refreshInterval)

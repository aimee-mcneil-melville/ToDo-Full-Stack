const createBoard = require('./createBoard')
const nextBoard = require('./nextBoard')
const displayBoard = require('./displayBoard')

const size = 10
const refreshInteral = 100

let board = createBoard(size)

setTimeout(() => {
  displayBoard(board)
  board = nextBoard(board)
}, refreshInteral)

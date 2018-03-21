const createBoard = require('./create-board')
const nextBoard = require('./next-board')
const displayBoard = require('./display-board')

const size = 10
const refreshInteral = 100

let board = createBoard(size)

setTimeout(() => {
  displayBoard(board)
  board = nextBoard(board)
}, refreshInteral)

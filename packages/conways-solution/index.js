const createBoard = require('./createBoard')
const nextBoard = require('./nextBoard')
const displayBoard = require('./displayBoard')

const size = 10
const refreshInteral = 100

let board = randomiseBoard(createBoard(size))

setInterval(() => {
  displayBoard(board)
  let theNextBoard = nextBoard(board)

  if (boardIsStable(board, theNextBoard)) process.exit()

  board = theNextBoard
}, refreshInteral)

function randomiseBoard(board) {
  return board.map(row => row.map(cell => Math.random() > 0.5))
}

function boardIsStable(thisBoard, thatBoard) {
  return JSON.stringify(thisBoard) == JSON.stringify(thatBoard)
}

const createBoard = require('../createBoard')
const nextBoard = require('../nextBoard')

test('nextBoard is not equal to createBoard', () => {
  const board = createBoard(10)
  const newBoard = nextBoard(board)
  expect(newBoard).not.toBe(board)
})

test('nextBoard cell dies from under population', () => {
  const board = createBoard(10)
  board[0][0] = true
  const newBoard = nextBoard(board)
  expect(newBoard[0][0]).toBeFalsy()
})

test('nextBoard cells persist', () => {
  const board = createBoard(10)
  board[1][1] = true
  board[1][2] = true
  board[2][1] = true
  board[2][2] = true

  const newBoard = nextBoard(board)

  expect(newBoard[2][2]).toBeTruthy()
  expect(newBoard[1][1]).toBeTruthy()
  expect(newBoard[2][1]).toBeTruthy()
  expect(newBoard[1][2]).toBeTruthy()
})

test('nextBoard cells become alive', () => {
  const board = createBoard(10)
  board[0][0] = true
  board[0][1] = true
  board[1][0] = true
  const newBoard = nextBoard(board)

  expect(newBoard[1][1]).toBeTruthy()
})

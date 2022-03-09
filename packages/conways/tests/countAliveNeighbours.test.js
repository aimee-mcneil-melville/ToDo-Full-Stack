const countAliveNeighbours = require('../countAliveNeighbours')
const createBoard = require('../createBoard')

test('countAliveNeighbours', () => {
  const board = createBoard(10)
  board[0][0] = true
  board[0][1] = true
  board[0][2] = true
  board[1][0] = true
  board[2][0] = true
  board[2][1] = true
  board[2][2] = false
  board[1][2] = true
  board[1][1] = false

  expect(countAliveNeighbours(1, 1, board)).toBe(7)
  expect(countAliveNeighbours(0, 0, board)).toBe(2)
})

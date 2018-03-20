var nextCellState = require('../nextCellState')

test('nextCellState', function () {
  expect(nextCellState(true, 2)).toBeTruthy()
  expect(nextCellState(true, 3)).toBeTruthy()
  expect(nextCellState(true, 4)).toBeFalsey()
  expect(nextCellState(true, 1)).toBeFalsey()
  expect(nextCellState(false, 3)).toBeTruthy()
})

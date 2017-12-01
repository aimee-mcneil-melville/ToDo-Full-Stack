var test = require('tape')
var nextCellState = require('../nextCellState')

test('nextCellState', function (t) {
  t.true(nextCellState(true, 2), 'returns true if cell is alive and neighbour count is 2')
  t.true(nextCellState(true, 3), 'returns true if cell is alive and neighbour count is 3')
  t.false(nextCellState(true, 4), 'should return false if cell is alive and overpopulated')
  t.false(nextCellState(true, 1), 'should return false if cell is alive and underpopulated')
  t.true(nextCellState(false, 3), 'should return true id cell is dead and ressurectable')
  t.end()
})

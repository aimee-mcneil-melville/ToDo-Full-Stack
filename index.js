var conways = require('./conway');
var display = require('./displayBoard');

var board = conways.createBoard(15)

board = spawnRandom(board)

setInterval(tick, 200)

function spawnRandom(board) {
  newBoard = [...board] // Whaaaat is that mojo?

  // ?? Put some alive cells in the empty board
  
  return newBoard 
}

function tick() {
  display(board)
  board = conways.nextBoard(board) 
}

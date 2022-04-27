const clear = require('clear')

function displayBoard (board) {
  clear()
  board.forEach(row => {
    const line  = row.map(cell => (cell ? 'o' : ' ')).join(' | ')
    // eslint-disable-next-line no-console
    console.log('| ' + line + ' |')
  })
}

module.exports = displayBoard

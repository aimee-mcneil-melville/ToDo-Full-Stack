var prompt = require('prompt')

var directory = require('./directory.json')

module.exports = {
  main: main,
  pressEnter: pressEnter
}

prompt.message = ''
prompt.delimiter = ' > '
prompt.start()

function main (next) {
  console.log(' Choose an artwork to display (or `q` to quit):\n')
  var list = directory.artworks.reduce(function (list, artwork, i) {
    return list + '  ' + i + ': ' + artwork + '\n'
  }, '')
  console.log(list)

  var choice = {
    name: 'choice',
    hidden: true,
    message: 'Choice'
  }
  prompt.get(choice, next)
}

function pressEnter (next) {
  prompt.get('Hit <enter> to continue...', function () {
    main(next)
  })
}


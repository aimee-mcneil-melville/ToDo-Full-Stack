var fs = require('fs')
var prompt = require('prompt')

var directory = require('./directory.json')

prompt.message = ''
prompt.delimiter = ' > '
prompt.start()

function mainMenu (next) {
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

function pressEnter () {
  prompt.get('Hit <enter> to continue...', function () {
    mainMenu(loadArt)
  })
}

function loadArt(err, result) {
  if (err) {
    console.error("I don't understand that.")
    return pressEnter()
  }
  if (result.choice === 'q') {
    process.exit()
  }

  var file = directory.artworks[result.choice]
  if (!file) {
    console.error("That's not one of the artworks!")
    return pressEnter()
  } else {
    fs.readFile(file, 'utf8', function (err, artwork) {
      if (err) {
        console.error("Can't load that file.")
        return pressEnter()
      }
      console.log(artwork)
      return pressEnter()
    })
  }
}

console.log(
  ' Welcome!\n',
  '--------\n'
)
mainMenu(loadArt)


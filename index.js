var fs = require('fs')
var prompt = require('prompt')
var readline = require('readline')

var directory = require('./directory.json')

prompt.message = ''
prompt.delimiter = ' > '
prompt.start()

function mainMenu (next) {
  console.log(
    ' Welcome!\n',
    '--------\n\n',

    'Choose an artwork to display:\n'
  )
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
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Hit <enter> to continue...', function () {
    rl.close()
    mainMenu(loadArt)
  })
}

function loadArt(err, result) {
  if (err) {
    console.error("I don't understand that.")
    return
  }
  var file = directory.artworks[result.choice]
  if (!file) {
    console.error("That's not one of the artworks!")
    pressEnter()
  } else {
    fs.readFile(file, 'utf8', function (err, artwork) {
      if (err) {
        console.error("Can't load that file.")
        pressEnter()
        return
      }
      console.log(artwork)
      pressEnter()
    })
  }
}

mainMenu(loadArt)


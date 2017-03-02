var fs = require('fs')
var prompt = require('prompt')
var directory = require('./directory.json')

prompt.message = ''
prompt.delimiter = ' > '
prompt.start()

function mainMenu (cb) {
  console.log(
    ' Welcome!\n',
    '--------\n\n',

    'Choose an artwork to display:'
  )
  var list = directory.artworks.reduce(function (list, artwork, i) {
    return list + ' ' + i + ': ' + artwork + '\n'
  }, '')

  var choice = {
    name: 'choice',
    hidden: true,
    message: 'Choice'
  }
  console.log(list)

  prompt.get(choice, cb)
}

function loadArt(err, result) {
  if (err) {
    console.error("I don't understand that.")
    return
  }
  fs.readFile(directory.artworks[result.choice], 'utf8', function (err, artwork) {
    if (err) {
      console.error("Can't load that file.")
      return
    }
    console.log(artwork)
  })
}

mainMenu(loadArt)


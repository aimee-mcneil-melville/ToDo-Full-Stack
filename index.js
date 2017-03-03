var fs = require('fs')

var directory = require('./directory.json')
var menu = require('./menu')

function loadArt(err, result) {
  if (err) {
    return error("I don't understand that.")
  }

  if (result.choice === 'q') {
    process.exit()
  }

  var file = directory.artworks[result.choice]
  if (!file) {
    return error("That's not one of the artworks!")
  } else {
    fs.readFile(file, 'utf8', function (err, artwork) {
      if (err) {
        return error("Can't load that file.")
      }
      console.log(artwork)
      return menu.pressEnter(loadArt)
    })
  }
}

function error (msg) {
  console.error(msg)
  menu.pressEnter(loadArt)
}

console.log(
  ' Welcome!\n',
  '--------\n'
)
menu.main(loadArt)


var fs = require('fs')

var directory = require('./directory.json')
var menu = require('./menu')

function loadArt (err, result) {
  if (err) {
    return error("I don't understand that.")
  }

  if (result.choice === 'q') {
    process.exit()
  }

  if (result.choice === 'c') {
    return menu.enterComment(saveComment)
  }

  if (result.choice === 'v') {
    return displayComments()
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

function displayComments () {
  fs.readFile('data/comments.txt', 'utf8', function (err, comments) {
    if (err) {
      return console.error("Can't read comments from the comments file.")
    }
    console.log('Comments people made about art:\n-------------------------------')
    console.log(comments)
    return menu.pressEnter(loadArt)
  })
}

function saveComment (err, input) {
  var comment = input.comment + '\n'
  fs.appendFile('data/comments.txt', comment, 'utf8', function (err) {
    if (err) {
      return error("Can't write to comments file.")
    }
    console.log("Your comment has been saved for posterity. Congratulations.")
    return menu.pressEnter(loadArt)
  })
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


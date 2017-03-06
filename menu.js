var fs = require('fs')
var prompt = require('prompt')

var comments = require('./comments')

module.exports = {
  areYouSure: areYouSure,
  enterComment: enterComment,
  main: main,
  pressEnter: pressEnter
}

prompt.message = ''
prompt.delimiter = ' > '
prompt.start()

function main (cb) {
  var next = cb || loader
  console.log(
    ' Choose an artwork to display, or:\n',
    '  `c` to comment\n',
    '  `e` to erase comments\n',
    '  `v` to view comments\n',
    '  `q` to quit\n'
  )
  fs.readdir('data', function (err, files) {
    var list = files.reduce(function (list, artwork, i) {
      if (artwork === 'comments.txt') {
        return list
      }
      return list + '  ' + i + ': ' + artwork + '\n'
    }, '')
    console.log(list)

    var choice = {
      name: 'choice',
      message: 'Choice'
    }
    prompt.get(choice, next)
  })
}

function enterComment () {
  var comment = {
    name: 'comment',
    message: 'Enter your comment'
  }
  prompt.get(comment, function (err, input) {
    if (err) {
      console.error("I don't understand that.")
      return pressEnter()
    }
    comments.save(input.comment, pressEnter)
  })
}

function pressEnter (cb) {
  var next = cb || loader
  prompt.get('Hit <enter> to continue...', function () {
    main(next)
  })
}

function areYouSure (yes) {
  var sure = {
    name: 'sure',
    message: 'Are you sure [y/N]?'
  }
  prompt.get(sure, function (err, result) {
    if (err) {
      return main(loader)
    }
    if (result.sure !== 'y') {
      return main(loader)
    }
    yes()
  })
}

function loader (err, result) {
  if (err) {
    return error("I don't understand that.")
  }

  switch (result.choice) {
    case 'q':
      process.exit()

    case 'c':
      return enterComment()

    case 'e':
      return areYouSure(comments.erase, pressEnter)

    case 'v':
      return comments.display(pressEnter)

    default:
      display(result.choice)
  }
}

function error (msg) {
  console.error(msg)
  pressEnter(loader)
}

function display (choice) {
  fs.readdir('data', function (err, files) {
    var file = files[choice]
    if (!file) {
      return error("That's not one of the artworks!")
    } 
    fs.readFile('data/' + file, 'utf8', function (err, artwork) {
      if (err) {
        return error("Can't load that file.")
      }
      console.log(artwork)
      return menu.pressEnter(core.loader)
    })
  })
}


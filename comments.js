var fs = require('fs')
var prompt = require('prompt')

module.exports = {
  erase: erase,
  display: display,
  save: save
}

function erase (next) {
  fs.truncate('data/comments.txt', 0, function (err) {
    if (err) {
      console.error("Can't delete the comments from the comments file.")
      return next()
    }
    console.log('All comments have been deleted.')
    next()
  })
}

function display (next) {
  fs.readFile('data/comments.txt', 'utf8', function (err, comments) {
    if (err) {
      console.error("Can't read comments from the comments file.")
      return next()
    }
    console.log('Comments people made about art:\n-------------------------------')
    console.log(comments)
    next()
  })
}

function save (comment, next) {
  var commentLine = comment + '\n'
  fs.appendFile('data/comments.txt', commentLine, 'utf8', function (err) {
    if (err) {
      console.error("Can't write to comments file.")
      return next()
    }
    console.log("Your comment has been saved for posterity. Congratulations.")
    next()
  })
}

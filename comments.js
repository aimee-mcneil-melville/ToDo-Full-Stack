var fs = require('fs')
var prompt = require('prompt')

module.exports = {
  display: display,
  get: get,
  erase: erase,
  save: save
}

function get (next, filename) {
  fs.readFile(filename || 'data/comments.txt', 'utf8', function (err, comments) {
    if (err) {
      return next(err)
    }
    next(null, comments)
  })
}

function display (next) {
  get(function (err, comments) {
    if (err) {
      console.error("Can't read comments from the comments file.")
      return next()
    }
    console.log('Comments people made about art:\n-------------------------------')
    console.log(comments)
    next()
  })
}

function erase (next, filename) {
  fs.truncate(filename || 'data/comments.txt', 0, function (err) {
    if (err) {
      console.error("Can't delete the comments from the comments file.")
      return next()
    }
    console.log('All comments have been deleted.')
    next()
  })
}

function save (comment, next, filename) {
  var commentLine = comment + '\n'
  fs.appendFile(filename || 'data/comments.txt', commentLine, 'utf8', function (err) {
    if (err) {
      console.error("Can't write to comments file.")
      return next()
    }
    console.log("Your comment has been saved for posterity. Congratulations.")
    next()
  })
}

var fs = require('fs')
var path = require('path')
var data = path.join(__dirname, '/data.json')

function getDogs (cb) {
  fs.readFile(data, 'utf8', function (err, dogs) {
    if (err) {
      return cb(err)
    }
    cb(null, JSON.parse(dogs))
  })
}

function getDog (id, cb) {
  fs.readFile(data, 'utf8', function (err, allDogs) {
    if (err) {
      return cb(err)
    }
    var dogs = JSON.parse(allDogs)
    for (var i = 0; i < dogs.length; i++) {
      if (dogs[i].id === id) {
        return cb(null, dogs[i])
      }
    }
    cb(new Error('Dog not found'))
  })
}

function saveDog (id, details, cb) {
  fs.readFile(data, 'utf8', function (err, allDogs) {
    if (err) {
      return cb(err)
    }

    var dogs = JSON.parse(allDogs)
    for (var i = 0; i < dogs.length; i++) {
      if (dogs[i].id === id) {
        dogs[i] = details
      }
    }

    fs.writeFile(data, JSON.stringify(dogs), function (err) {
      if (err) {
        return cb(err)
      }
      cb()
    })
  })
}

module.exports = {
  getDogs: getDogs,
  saveDog: saveDog,
  getDog: getDog
}

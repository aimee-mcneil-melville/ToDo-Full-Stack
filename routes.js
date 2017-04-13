var express = require('express')
var router = express.Router()
var fs = require('fs')

router.get('/', function (req, res) {
  res.redirect('/puppies')
})

router.get('/puppies', function (req, res) {
  fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }
    var puppies = {
      puppies: JSON.parse(data)
    }
    res.render('puppies/index', puppies)
  })
})

router.get('/puppies/:id', function (req, res) {
  fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }

    var id = Number(req.params.id)
    var puppies = JSON.parse(data)

    for (var i = 0; i < puppies.length; i++) {
      if (puppies[i].id === id) {
        var puppy = puppies[i]
        return res.render('puppies/view', puppy)
      }
    }
    res.send('No puppy found :(')
  })
})

router.get('/puppies/edit/:id', function (req, res) {
  fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }

    var id = Number(req.params.id)
    var puppies = JSON.parse(data)

    for (var i = 0; i < puppies.length; i++) {
      if (puppies[i].id === id) {
        var puppy = puppies[i]
        return res.render('puppies/edit', puppy)
      }
    }
    res.send('No puppy found :(')
  })
})

router.post('/puppies/edit/:id', function (req, res) {
  var id = Number(req.params.id)

  var updatedPuppy = {
    id: id,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed
  }

  fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }

    var puppies = JSON.parse(data)

    for (var i = 0; i < puppies.length; i++) {
      if (puppies[i].id === id) {
        puppies[i] = updatedPuppy
      }
    }

    fs.writeFile('./data.json', JSON.stringify(puppies), function (err) {
      if (err) {
        return res.status(500).send('An Error Occured!')
      }
      return res.redirect('/puppies/' + id)
    })
  })
})

module.exports = router

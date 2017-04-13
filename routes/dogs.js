var express = require('express')
var router = express.Router()

var db = require('../data/db')

router.get('/', function (req, res) {
  db.getDogs(function (err, data) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }

    var dogs = {
      dogs: data
    }
    res.render('dogs/index', dogs)
  })
})

router.get('/:id', function (req, res) {
  db.getDog(Number(req.params.id), function (err, data) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }
    res.render('dogs/view', data)
  })
})

router.get('/edit/:id', function (req, res) {
  db.getDog(Number(req.params.id), function (err, data) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }
    res.render('dogs/edit', data)
  })
})

router.post('/edit/:id', function (req, res) {
  var id = Number(req.params.id)

  var dog = {
    id: id,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed
  }

  db.saveDog(id, dog, function (err) {
    if (err) {
      return res.status(500).send('An Error Occured!')
    }
    res.redirect('/dogs/' + id)
  })
})

module.exports = router

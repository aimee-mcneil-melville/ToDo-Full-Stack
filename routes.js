var express = require('express')
var router = express.Router()

var db = require ('./data/db')

router.get('/', function (req, res) {
  res.redirect('/dogs')
})

router.get('/dogs', function(req, res) {
  db.getDogs(function(err, data) {
    var dogs = {
      dogs: data
    }
    res.render('dogs/index', dogs)
  })
})

router.get('/dogs/:id', function (req, res) {
  db.getDog(Number(req.params.id), function (err, data) {
    res.render('dogs/view', data)
  })
})

router.get('/dogs/edit/:id', function (req, res) {
  db.getDog(Number(req.params.id), function (err, data) {
    res.render('dogs/edit', data)
  })
})

router.post('/dogs/edit/:id', function (req, res) {
  var id = Number(req.params.id)
  
  var dog = {
    id: id,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed
  }
  
  db.saveDog(id, dog, function (err, data) {
    res.redirect('/dogs/'+id)
  })
})

module.exports = router
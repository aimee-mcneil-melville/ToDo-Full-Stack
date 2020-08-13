// ROUTES.JS //

var express = require('express')
var router = express.Router()
let data = require('./data.json')
const fs = require('fs')

router.get('/', (req, res) => {
    res.redirect('/puppies')
  })
  
  router.get('/puppies', (req, res) => {
    res.render('puppies/index', data)
  })

  router.get('/puppies/:id', (req, res) => {
      
      let id = req.params.id

      let puppy = data.puppies[id - 1]
      
      res.render('puppies/view', puppy)
    })
    
    router.get('/puppies/edit/:id', (req, res) => {
        let id = req.params.id

        let puppy = data.puppies[id - 1]

        res.render('puppies/edit', puppy)
    })

    router.post('/puppies/edit/:id', (req, res) => {

        let id = req.params.id

        let puppy =  {
            "id": req.params.id,
            "name": req.body.name,
            "owner": req.body.owner,
            "image": req.body.image,
            "breed": req.body.breed
          }

          data.puppies[id - 1] = puppy

          let str = JSON.stringify(data)

          fs.writeFile('./data.json', str, (err) => {

            res.redirect('/puppies/' + id)

          })
    })

  module.exports = router
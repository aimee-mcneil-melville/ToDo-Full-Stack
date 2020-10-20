const express = require('express')

const lib = require('./lib')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  lib.getPuppyData((err, puppyData) => {
    if (err) {
      return res.status(500).send(err.message)
    }

    res.render('home', puppyData)
  })
})

router.get('/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  lib.getPuppyById(id, (err, puppyDetails) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    res.render('edit', puppyDetails)
  })
})

router.post('/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  const { name, breed, owner, image } = req.body
  const updatedPuppy = { id, name, breed, owner, image }

  lib.editPuppy(updatedPuppy, (err) => {
    if (err) {
      err.code === 404
        ? res.sendStatus(404)
        : res.status(500).send(err.message)

      return
    }

    res.redirect('/' + id)
  })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, breed, owner, image } = req.body
  const newPuppy = { name, breed, owner, image }

  lib.addNewPuppy(newPuppy, (err, id) => {
    if (err) {
      return res.status(500).send(err.message)
    }

    res.redirect('/' + id)
  })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  lib.getPuppyById(id, (err, puppyDetails) => {
    if (err) {
      err.code === 404
        ? res.sendStatus(404)
        : res.status(500).send(err.message)

      return
    }

    res.render('details', puppyDetails)
  })
})

const express = require('express')
const router = express.Router()

const development = require('./knexfile').development
const knex = require('knex')(development)

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/list', function (req, res) {
  knex('wombles')
    .then(function (wombles) {
      res.render('list', { wombles: wombles })
    })
})

router.get('/view/:id', function (req, res) {
  const id = req.params.id
  knex('wombles')
    .join('characteristics', 'wombles.characteristic_id', 'characteristics.id')
    .where({ 'wombles.id': id })
    .then(function (wombles) {
      const womble = wombles[0]
      res.render('view', womble)
    })
})

router.get('/assignments', function (req, res) {
  knex('wombles')
    .select('wombles.id as womble_id', 'wombles.name as womble_name', 'rubbish.name as rubbish_name')
    .join('rubbish', 'wombles.rubbish_id', 'rubbish.id')
    .then(function (wombles) {
      res.render('assignments', { wombles: wombles })
    })
})

module.exports = router

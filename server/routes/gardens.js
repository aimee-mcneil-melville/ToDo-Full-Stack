const express = require('express')

const db = require('../db')

const router = express.Router()

function getGardenById (id) {
  const fakeGarden = {
    'id': 2,
    'name': 'Kahu Gardens',
    'address': '12 Hukanui Crescent',
    'description': 'Kelmarna Gardens is a city farm and ...',
    'lat': -36.86011508905973,
    'lon': 174.7330772002716,
    'url': 'http://www.kelmarnagardens.nz',
    'events': [{
      'id': 1,
      'volunteersNeeded': 8,
      'title': 'Weeding Worker Bee',
      'datetime': 'Wed, 27 Sep 2020 20:00:00 GMT',
      'description': "It's time to get these weeds under control."
    }]
  }
  return Promise.resolve(fakeGarden)
}

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  getGardenById(id)
    .then(singleGarden => {
      return res.json(singleGarden)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.get('/', (req, res) => {
  db.getGardens()
    .then(gardens => {
      return res.json({ gardens })
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router

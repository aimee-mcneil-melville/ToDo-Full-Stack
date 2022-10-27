const express = require('express')
const router = express.Router()

import {getWidgets} from'../db/db'

router.get('/', (req, res) => {
  getWidgets()
    .then((widgets) => {
      res.json(widgets)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router

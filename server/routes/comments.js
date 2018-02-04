const express = require('express')
const bodyParser = require('body-parser')

const db = require('../db/db')

const router = express.Router()

router.use(bodyParser.json())

module.exports = router


var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  //use req.app.get('db') to get the knex connection that was set in server
  //console.log(req.app.get('db'))
  res.send('WOMBLES!')
})

module.exports = router

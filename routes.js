var db = require('./db')

module.exports = {
  fruit: fruit
}

function fruit (req, res) {
  var data = db.getHomeData()
  data.showList = req.query.showlist

  res.render('fruit', data)
}

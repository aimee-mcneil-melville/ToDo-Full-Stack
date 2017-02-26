var db = require('./db')

module.exports = {
  home: home
}

function home (req, res) {
  var data = db.getRepoData()
  data.showList = req.query.showlist
  res.render('home', data)
}

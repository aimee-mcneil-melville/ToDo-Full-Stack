var db = require('./db')

module.exports = {
  home: home,
  detail: detail
}

function home (req, res) {
  var data = db.getRepoData()
  data.showList = req.query.showlist

  res.render('home', data)
}

function detail (req, res) {
  var repoId = req.params.id

  var data = db.getRepoWithId(repoId)
  res.render('detail', data)
}


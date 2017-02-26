var githubData = require('./github.json')

module.exports = {
  getAuthorDetails: getAuthorDetails,
  getHomeData: getHomeData,
  getRepoWithId: getRepoWithId,
  getRepoData: getRepoData
}

function getHomeData () {
  return {
    title: 'Awesome title',
    headerText: 'Welcome to Awesome',
    fruitList: [{
      name: 'apples',
      colour: 'red'
    }, {
      name: 'oranges',
      colour: 'orange'
    }, {
      name: 'bananas',
      colour: 'yellow'
    }]
  }
}

function getRepoData () {
  var repos = githubData.map(function (repo) {
    return { 
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      isFork: repo.fork
    }
  })

  return { repos: repos }  // have to return an Object (not an Array)
}

function getRepoWithId (id) {
  var id = Number(id) // make sure it's a number before we start comparing!

  var repo = githubData.find(function(repo) {
    return repo.id === id
  })

  return repo
}

function getAuthorDetails (id) {
  var repo = getRepoWithId(id)

  return repo.owner
}


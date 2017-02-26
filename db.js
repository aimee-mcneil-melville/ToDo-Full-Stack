var githubData = require('./github.json')

module.exports = {
  getHomeData: getHomeData,
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
    return { name: repo.name }
  })

  return { repos: repos }  // have to return an Object (not an Array)
}



function hasItem (arr, item) {
}

function getItemAtIndex (arr, idx) {
}

function replaceItemAtIndex (arr, idx, item) {
}

function insertItemAtIndex (arr, item,  idx) {
}

function deleteItemAtIndex (arr, idx) {
}

function deleteItem (arr, item) {
}


// objects to arrays to objects

function keys (obj) {
}

function values (obj) {
}

function zipObject (keys, values) {
}

function unzip(obj) {
}

function findOneByProperty (arr, keyValue) {
}

function findAll (arr, keyValue) {
}

// TESTS

var arrayOfDifferentTypes = [ 'a', 1, null, true ] 

console.log(hasItem(arrayOfDifferentTypes, 'a') === true)
console.log(hasItem(arrayOfDifferentTypes, 'mickey') === false)

var alphabet = ['a', 'b', 'c', 'd', 'e' ]
console.log(getItemAtIndex(alphabet, 3) === 'd')
console.log(getItemAtIndex(alphabet, 10).name = 'Error')

replaceItemAtIndex(alphabet, 0, 'alpha')

console.log(alphabet)
console.log(alphabet[0] === 'alpha')

var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
insertItemAtIndex(names, 'Dan', 3)
console.log(names)
console.log(names[3] === 'Dan')

deleteItemAtIndex(names, 1) 
console.log(names[1] !== 'Bob')

deleteItem(names, 'Celia')
console.log(hasItem(names, 'Celia') === false)

var dracula = { 
  name: 'Count Dracula', 
  email: 'dracula@hotmail.com',
  password: '12345',
  country: 'Transylvania'
}

var expectedKeys = [ 'name', 'email', 'password', 'country' ]
var expectedValues = [ 'Count Dracula', 'dracula@hotmail.com', '12345', 'Transylvania' ]

var actualKeys = keys(dracula)
if (actualKeys) {
  actualKeys.forEach(function (key) {
    console.log(expectedKeys.indexOf(key) > -1, key)
  })
}

var actualValues = values(dracula)
if (actualValues) {
  actualValues.forEach(function (value) {
    console.log(expectedValues.indexOf(value) > -1, value)
  })
}

var draculaReborn = zipObject(expectedKeys, expectedValues)
if (draculaReborn) {
  Object.keys(draculaReborn).forEach(function (key) {
    console.log(key + ' of draculaReborn is present on draculaReborn:  ', Object.keys(dracula).indexOf(key) > -1)
  })
}

var pairs = unzip(dracula)
if (pairs) {
  pairs.forEach(function (pair) {
    console.log(dracula[pair[0]] === pair[1])
  })
}

var monsters = [
  { 
    name: 'Count Dracula', 
    email: 'dracula@hotmail.com', 
    country: 'Transylvania',
    age: 588,
  },
  { 
    name: "Frankenstein's Monster", 
    email: 'franky@monster.com', 
    country: 'Switzerland',
    age: 232,
  },
  { 
    name: 'Cthulhu', 
    email: 'cthulhu@thedeep.com', 
    country: "R'lyeh", 
    age: 1032988 
  },
  { 
    name: 'Taniwha', 
    email: 'taniwha@awa.com', 
    country: 'Aotearoa', 
    age: 232
  }
]

var foundMonster = findOneByProperty(monsters, { name: 'Taniwha' }) 
if (foundMonster) {
  console.log('findOneByProperty findsthe monster ' + foundMonster.name, foundMonster === monsters[3])
}

var foundMonsters = findAll(monsters, { age: 232 })
if (foundMonsters) {
  console.log(foundMonsters.length === 2)
  foundMasters.forEach(function (monster) {
    console.log('findAll finds the monster with age 232: ' + monster.name)
  }
}
























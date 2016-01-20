
function hasItem (arr, item) {
  if (arr.indexOf(item) > -1) {
    return true
  } else {
    return false
  }
}

function getItemAtIndex (arr, idx) {
  if (idx > arr.length - 1) {
    return new Error('item at index: ' + idx + ' does not exist')
  }  
  return arr[idx]
}

function replaceItemAtIndex (arr, idx, item) {
  arr[idx] = item
  return arr
}

function insertItemAtIndex (arr, item,  idx) {
  if (idx > arr.length) {
    return new Error('array is too short!')
  } else {
    return arr.splice(idx, 0, item)
  }
}

function deleteItemAtIndex (arr, idx) {
  if (idx > arr.length - 1) { 
    return new Error('No Item at index: ' + idx + '!') 
  }
  return arr.splice(idx, 1)
}

function deleteItem (arr, item) {
  var idx = arr.indexOf(item)

  if (idx > -1) {
    return arr.splice(idx, 1)
  } else {
    return arr
  }   
}


// objects to arrays to objects

function keys (obj) {
  return Object.keys(obj)
}

function values (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}

function zipObject (keys, values) {
  if (keys.length !== values.length) {
    return new Error('different number of keys and values')
  }
  var obj = {}
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i]
  }

  return obj
}

function unzip(obj) {
  return Object.keys(obj).map(function (key) {
    return [key, obj[key]]
  })
}

function findOneByProperty (arr, keyValue) {
  var key = Object.keys(keyValue)[0]

  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === keyValue[key]) {
      return arr[i]
    }
  }

  return undefined
}

function findAll (arr, keyValue) {
  var key = Object.keys(keyValue)[0]
  var results = []

  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === keyValue[key]) {
      results.push(arr[i])
    }
  }

  return results
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
  console.log('We found the monster ' + foundMonster.name, foundMonster === monsters[3])
}

var foundMonsters = findAll(monsters, { age: 232 })
if (foundMonsters) {
  console.log(foundMonsters.length === 2)
  foundMasters.forEach(function (monster) {
    console.log('We found the monster with age 232: ' + monster.name)
  }
}
























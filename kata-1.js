
// simple objects

function makeObject (key, value) {
  const obj = {}
  obj[key] = value
  return obj
}

function getValue (obj, key) {
  return obj[key]
}

function ageOneYear (obj) {
  obj.age += 1
  return obj
}

function deleteProp (obj, key) {
  delete obj[key]
  return obj
}

// simple arrays

function makeArrayOfItem (item, length) {
  var arr = []
  for (var i = 0; i < length; i++) {
    arr.push(item)
  }
  return arr
}

function makeArrayOfItems () {
  var arr = []
  for (var i = 0; i < arguments.length; i++) {
    arr.push(arguments[i])
  }
  return arr
}

function mapGreetings (names) {
  return names.map(function (name) {
    return 'Hello ' + name
  }
}

// break 



function hasItem (arr, item) {
  if (arr.indexOf(item) > -1) {
    return true
  } else {
    return false
  }
}

function returnErrorIfFalsy (bool) {
  if (!bool) {
    return new Error('On no an error!')
  } else {
    return bool
  }
}

function getItem (arr, idx) {
  if (idx > arr.length - 1) {
    return new Error('item at index: ' + idx + ' does not exist')
  }  
  return arr[idx]
}

function replaceItemAtIndex (arr, idx, item) {
  arr[idx] = item
  return arr
}

function insertItem (arr, item,  idx) {
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

function mapKeys (obj) {
  return Object.keys(obj)
}

function mapValues (obj) {
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

function unZipObject (obj) {
  return Object.keys(obj).map(function (key) {
    return [key, obj[key]]
  })
}

function findByProp (arr, keyValue) {
  var key = Object.keys(keyValue)[0]
  var result

  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === keyValue[key]) {
      result = arr[i]
    }
  }
  return result
}

// TESTS 

var expectedObj = { a: 1 }
var actual = makeObject('a', 1)

console.log(actual.a === expectedObj.a)
console.log(getValue(expectedObj, 'a') === 1)

var mickey = { name: 'Mickey Mouse', age: 64, email: 'mickey@disney.com' } 
console.log(ageOneYear(mickey).age === 65)

deleteProp(mickey, 'email')
console.log(typeof mickey.email === 'undefined')

var expectedArray = [ 'a', 'a', 'a' ]
var actualArray = makeArrayOfItem('a', 3)

for (var i = 0; i < expectedArray.length; i++) {
  console.log(expectedArray[i] === actualArray[i])
}

var arrayOfDifferentItems = [ 'a', 2, false]
var actualArrayOfDifferent = makeArrayOfItems('a', 2, false)

for (var i = 0; i < expectedArray.length; i++) {
  console.log(arrayOfDifferentItems[i] === actualArrayOfDifferent[i])
}


var names = [ 'Alice', 'Bob', 'Celia', 'Dan' ]
var expectedGreetings = [ 'Hello Alice', 'Hello Bob', 'Hello Celia', 'Hello Dan' ]
var actualGreetings = mapGreetings(names)

for (var i = 0; i < names.length; i++) {
  console.log(actualGreetings[i] === expectedGreetings[i])
}


// break 


console.log(hasItem(arrayOfDifferentItems, 'a') === true)
console.log(hasItem(arrayOfDifferentItems, 'mickey') === false)

var err = returnErrorIfFalsy(false)
console.log(err.name === 'Error' && err.message === 'Oh no an error!')

var notErr = returnErrorIfFalsy({})
console.log(notErr === true)













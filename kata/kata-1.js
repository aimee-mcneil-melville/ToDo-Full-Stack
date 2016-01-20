
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

function getGreeting (name) {
  return 'Hello ' + name
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


var arrayOfDifferentItems = [ 'a', 2, false ]
var actualArrayOfDifferent = makeArrayOfItems('a', 2, false)

for (var i = 0; i < expectedArray.length; i++) {
  console.log(arrayOfDifferentItems[i] === actualArrayOfDifferent[i])
}


var names = [ 'Alice', 'Bob', 'Celia', 'Dan' ]
var expectedGreetings = [ 'Hello Alice', 'Hello Bob', 'Hello Celia', 'Hello Dan' ]
var actualGreetings = names.map(getGreeting)

for (var i = 0; i < names.length; i++) {
  console.log(actualGreetings[i] === expectedGreetings[i])
}


var people = [ { name: 'Alice' }, { name: 'Bob' }, { name: 'Celia' }, { name: 'Dan' } ]
var expectedPeopleWithGreetings = [ 
  { name: 'Alice', greeting: 'Hello Alice' }, 
  { name: 'Bob', greeting: 'Hello Bob' }, 
  { name: 'Celia', greeting: 'Hello Celia' }, 
  { name: 'Dan', greeting: 'Hello Dan' } 
]

var actualPeopleWithGreetings = people.map(function (person) {
  person.greeting = getGreeting(person.name)
  return person
})

for (var i = 0; i < expectedPeopleWithGreetings.length; i++) {
  console.log(expectedPeopleWithGreetings[i].greeting === actualPeopleWithGreetings[i].greeting)
}










// break 


console.log(hasItem(arrayOfDifferentItems, 'a') === true)
console.log(hasItem(arrayOfDifferentItems, 'mickey') === false)

var err = returnErrorIfFalsy(false)
console.log(err.name === 'Error' && err.message === 'Oh no an error!')

var notErr = returnErrorIfFalsy({})
console.log(notErr === true)













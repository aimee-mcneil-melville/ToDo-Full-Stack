
// simple objects

function makeObject (key, value) {
}

function getValue (obj, key) {
}

function ageOneYear (obj) {
}

function deleteProp (obj, key) {
}

// simple arrays

function makeArrayOfItem (item, length) {
}

function makeArrayOfItems () {
}

function getGreeting (name) {
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
var err = returnErrorIfFalsy(false)
console.log(err.name === 'Error' && err.message === 'Oh no an error!')

var notErr = returnErrorIfFalsy({})
console.log(notErr === true)

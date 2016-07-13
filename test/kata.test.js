// Consolidating all the tests into one file is NOT normal practice!
// We're more interested in getting you used to making tests pass...
// so we didn't want you to have to deal with more than one test at a time
var test = require('ava')
var kata1 = require('../kata/kata-1.js')
var kata2 = require('../kata/kata-2.js')

test('makeObject makes objects', function (t) {
  var expected = { a: 1 }
  var actual = kata1.makeObject('a', 1)
  t.deepEqual(actual, expected)
})

test('getValue gets values from objects', function (t) {
  var expected = 1
  var actual = kata1.getValue({ a: 1 }, 'a')
  t.is(actual, expected)
})

test('ageOneYear adds 1 year to the age property of an object', function (t) {
  var mickey = { 
    name: 'Mickey Mouse',
    age: 64,
    email: 'mickey@disney.com'
  }
  var expected = {
    name: 'Mickey Mouse',
    age: 65,
    email: 'mickey@disney.com'
  }
  kata1.ageOneYear(mickey)
  t.deepEqual(mickey, expected)
})

test('deleteProp deletes properties', function (t) {
  var mickey = { 
    name: 'Mickey Mouse',
    age: 64,
    email: 'mickey@disney.com'
  }
  var expected = {
    name: 'Mickey Mouse',
    age: 64
  }
  kata1.deleteProp(mickey, 'email')
  t.deepEqual(mickey, expected)
})

test('makeArrayOfItem (SINGULAR) makes an array out of one item', function (t) {
  var expected = ['a', 'a', 'a']
  var actual = kata1.makeArrayOfItem('a', 3)
  t.deepEqual(actual, expected)
})

test('makeArrayOfItems (PLURAL) makes an array of arguments', function (t) {
  var expected = ['foo', 'bar', 'wombat', false, 99]
  var actual = kata1.makeArrayOfItems('foo', 'bar', 'wombat', false, 99)
  t.deepEqual(actual, expected)
})

test('getGreeting returns "Hello <name>"', function (t) {
  var expected = 'Hello Aardvark'
  var actual = kata1.getGreeting('Aardvark')
  t.is(actual, expected)
})

test('returnErrorIfFalsy returns the correct Error when passed 0', function (t) {
  var expected = new Error('Oh no, an error!')
  var actual = kata1.returnErrorIfFalsy(0)
  t.deepEqual(actual, expected)
})

test('returnErrorIfFalsy(1) is undefined', function (t) {
  var expected = undefined
  var actual = kata1.returnErrorIfFalsy(1)
  t.is(actual, expected)
})

test('hasItem returns true if item is in array', function (t) {
  var arr = ['a', 1, null, true]
  var expected = true
  var actual = kata2.hasItem(arr, 'a')
  t.is(actual, expected)
})

test('hasItem returns false if item is not in array', function (t) {
  var arr = ['a', 1, null, true]
  var expected = false
  var actual = kata2.hasItem(arr, 'b')
  t.is(actual, expected)
})

test('getItemAtIndex returns the correct item for an existing index', function (t) {
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = 'd'
  var actual = kata2.getItemAtIndex(alphabet, 3)
  t.is(actual, expected)
})

test('getItemAtIndex returns a JavaScript Error for a non-existent index', function (t) {
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = new Error()
  var actual = kata2.getItemAtIndex(alphabet, 5)
  t.deepEqual(actual, expected)
})

test('replaceItemAtIndex replaces the correct item', function (t) {
  var alphabet = ['a', 'b', 'c', 'd', 'e']
  var expected = ['alpha', 'b', 'c', 'd', 'e']
  kata2.replaceItemAtIndex(alphabet, 0, 'alpha')
  t.deepEqual(alphabet, expected)
})

test('insertItemAtIndex inserts an element into the array', function (t) {
  var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  var expected = [ 'Aroha', 'Bob', 'Celia', 'Dan', 'Eleanor' ]
  kata2.insertItemAtIndex(names, 'Dan', 3)
  t.deepEqual(names, expected)
})

test('deleteItemAtIndex deletes an element from the array', function (t) {
  var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor' ]
  var expected = [ 'Aroha', 'Bob', 'Eleanor' ]
  kata2.deleteItemAtIndex(names, 2)
  t.deepEqual(names, expected)
})

test('deleteItem deletes ALL instances of item from the array', function (t) {
  var names = [ 'Aroha', 'Bob', 'Celia', 'Eleanor', 'Bob', 'Bob' ]
  var expected = [ 'Aroha', 'Celia', 'Eleanor' ]
  var actual = kata2.deleteItem(names, 'Bob')
  t.deepEqual(actual, expected)
})

test('keys returns own property keys for an object', function (t) {
  var dracula = { 
    name: 'Count Dracula', 
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  var expected = ['name', 'email', 'password', 'country']
  var actual = kata2.keys(dracula)
  t.deepEqual(actual, expected)
})

test('values returns own values for an object', function (t) {
  var dracula = { 
    name: 'Count Dracula', 
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  var expected = ['Count Dracula', 'dracula@hotmail.com', '12345', 'Transylvania']
  var actual = kata2.values(dracula)
  t.deepEqual(actual, expected)
})

test('zipObject returns an object by combining key and value arrays', function (t) {
  var draculaReborn = { 
    name: 'Count Dracula', 
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  var actual = kata2.zipObject(
    ['name', 'email', 'password', 'country'],
    ['Count Dracula', 'dracula@hotmail.com', '12345', 'Transylvania']
  )
  t.deepEqual(actual, draculaReborn)
})

test('unzipObject returns an array of key/value pairs', function (t) {
  var dracula = { 
    name: 'Count Dracula', 
    email: 'dracula@hotmail.com',
    password: '12345',
    country: 'Transylvania'
  }
  var expected = Object.keys(dracula)
    .map(function (key) {
      return [key, dracula[key]]
    })
  var actual = kata2.unzipObject(dracula)
  t.deepEqual(actual, expected)
})

test('findOneByProperty returns an object with matching property', function (t) {
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
  var expected = { 
    name: 'Cthulhu', 
    email: 'cthulhu@thedeep.com', 
    country: "R'lyeh", 
    age: 1032988 
  }
  var actual = kata2.findOneByProperty(monsters, { name: 'Cthulhu' })
  t.deepEqual(actual, expected)
})

test('findAll returns the correct set of elements', function (t) {
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
  var expected = [
    { 
      name: "Frankenstein's Monster", 
      email: 'franky@monster.com', 
      country: 'Switzerland',
      age: 232,
    },
    { 
      name: 'Taniwha', 
      email: 'taniwha@awa.com', 
      country: 'Aotearoa', 
      age: 232
    }
  ]
  var actual = kata2.findAll(monsters, { age: 232 })
  t.deepEqual(actual, expected)
})


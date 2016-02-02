// main 
var kata = require('../')
var test = require('tape')
var each = kata.each // require('your-library-name').each
// var map = require('your-library-name').map
// var utils = require('your-library-name')

// test data
contactsObj = { 
  '123': { address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 },
  '124': { address: 'Bag End', name: 'Bilbo Baggins', age: 78 },
  '125': { address: 'Wayne Manor', name: 'Bruce Wayne', age: 43 },
  '126': { address: 'Skull Island', name: 'Dr Evil', age: 51 },
  '127': { address: 'Wayne Manor', name: 'Alfred', age: 78 }
}

var contacts = [
  { id: '123', address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 },
  { id:  '124', address: 'Bag End', name: 'Bilbo Baggins', age: 78 },
  { id: '125', address: 'Wayne Manor', name: 'Bruce Wayne', age: 43 },
  { id: '126', address: 'Skull Island', name: 'Dr Evil', age: 51 },
  { id: '127', address: 'Wayne Manor', name: 'Alfred', age: 78 }
]

var expectedAddresses = [ '742 Evergreen Terrace', 'Bag End', 'Wayne Manor', 'Skull Island', 'Wayne Manor' ]

var marge =  { id: '123', address: '742 Evergreen Terrace', name: 'Marge Simpson', age: 47 }
var drEvil = { id: '126', address: 'Skull Island', name: 'Dr Evil', age: 51 }
var alfred = { id: '127', address: 'Wayne Manor', name: 'Alfred', age: 78 }

test('basic search functions', function (t) {
  
  t.equal(kata.getValue(contactsObj, '123').name, marge.name, 'getValue gets a nested object by key')

  var addresses = contacts.map(kata.getAddress)
  // var addresses = map(kata.getAddress, contacts)
  t.deepEqual(addresses, expectedAddresses, 'map and getAddress return the address prpoerty from objects in an array')

  var results123 = kata.where(contacts, { id: '123' })
  t.deepEqual(results123[0], marge, 'where() finds an object by id in an array')

  var resultsSkullIsland = kata.where(contacts, { address: 'Skull Island' })
  t.deepEqual(resultsSkullIsland[0], drEvil, 'where() finds an object by property')

  var resultsAge = kata.where(contacts, { age: 78 })
  t.equal(resultsAge.length, 2, 'where() returns an array of the coorect length')

  var resultsTwo = kata.where(contacts, { age: 78, address: 'Wayne Manor' })
  t.deepEqual(resultsTwo[0], alfred, 'where() finds objects with two search properties')


  t.end()
})

/**
 * Objects, keys/properties and values
 */

// getGreeting should return a string containing
// 'Hello ' and the contents of `name`
function getGreeting (name) {
  return "Hello " + name
}

// ageOneYear should return a new object with an `age` property 1 greater
// than the `age` property of `obj`
function ageOneYear (obj) {
  return {
    name: obj.name,
    age: obj.age + 1,
    email: obj.email
  }
}

// makeObject should return an object that looks like this:
// (but using the arguments passed to the function)
// {
//   key: value
// }
function makeObject (key, value) {
  return {
    [key]: value
  }
}

// getPropertyValue should return the value of the
// property contained in the `key` of `obj`
function getPropertyValue (obj, key) {
  return obj[key]
}

// addName should return a copy of `obj` with the addition of a `name`
// property that has the value of the `name` argument
// Tip: consider the object literal spread syntax
function addName (obj, name) {
  return {
    ...obj, 
    name: name
  }
}

// deleteProperty should return a new copy of `obj` without the property name
// that matches the `key` parameter
// Tip: consider JavaScript's `delete` operator
function deleteProperty (obj, key) {
  var newObj = {
    ...obj
  }
  
  delete newObj[key]

  return newObj
}

// returnErrorIfFalsy should return a JavaScript Error object with message:
//   'Oh no, an error!'
// if val evaluates to false
// Tip: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
function returnErrorIfFalsy (val) {
  if (val == false) {
    return new Error('Oh no, an error!')
  }
}

// keys should return an array of the object's property names (keys)
// For example, given { foo: 1, bar: 2 } it would return ['foo', 'bar']
function getKeys (obj) {
  let arr = []

  for (const property in obj){
    arr.push(property)
  }

  return arr
}

// getValues should return an array of the object's own values
// For example, given { foo: 1, bar: 2 } it would return [1, 2]
function getValues (obj) {
  let arr = []

  for (const property in obj){
    arr.push(obj[property])
  }

  return arr
}

/**
 * Arrays
 */

// makeArrayOfItem should return an array that is `length` long, made up of
// `item`. For example, makeArrayOfItem('foo', 2) would return:
// ['foo', 'foo']
function makeArrayOfItem (item, length) {
  let arr = []

  for (i = 0; i < length; i++){
    arr.push(item)
  }

  return arr
}

// makeArrayOfItems should return an array containing all arguments passed to it
// Tip: consider JavaScript's Rest parameters
function makeArrayOfItems (...args) {
  let arr = []

  for (i = 0; i < args.length; i++){
    arr.push(args[i])
  }

  return arr
}

// hasItem should return true if `item` is present in `arr` at least once,
// otherwise it should return false.
// Tip: there is an array function that makes this straightforward
function hasItem (arr, item) {
  if (arr.find(element => element == item) != null){
    return true
  } else {
    return false
  }
}

// getItemAtIndex should return arr[idx] but only if that index exists:
// if it doesn't, return a JavaScript Error object.
function getItemAtIndex (arr, idx) {
  if (idx >= 0 && idx < arr.length){
    return arr[idx]
  } else {
    return new Error()
  }
}

// replaceItemAtIndex should return a copy of `arr` with
// the element at `idx` replaced with `item`
// Tip: consider the array literal spread syntax
function replaceItemAtIndex (arr, idx, item) {
  let newArr = [...arr]
  newArr.splice(idx, 1, item)
  return newArr
}

// insertItemAtIndex should return a copy of `arr` with `item` inserted at
// `idx` without overwriting any array values (the array should get longer)
function insertItemAtIndex (arr, item,  idx) {
  let newArr = [...arr]
  newArr.splice(idx, 0, item)
  return newArr
}

// deleteItemAtIndex should return a copy of `arr` without
// the element at `idx` (the array should get shorter).
function deleteItemAtIndex (arr, idx) {
  let newArr = [...arr]
  newArr.splice(idx, 1)
  return newArr
}

// deleteItem should return an array with every instance of `item` removed
function deleteItem (arr, item) {
  return arr.filter(element => element != item)
}

// zipObject should return an object built from two arrays
// For example, given ['foo', 'bar'] and [1, 2] it would return
// { foo: 1, bar: 2 }
function zipObject (keys, values) {
  let obj = {}
  for (i = 0; i < keys.length; i++){
    obj[keys[i]] = values[i]
  }
  return obj
}

// unzipObject should return an array of arrays, each one a pair of keys and values
// For example, given {foo: 1, bar: 2} it would return
// [['foo', 1], ['bar', 2]]
function unzipObject (obj) {

  let newArr = []

  for (const property in obj){
    newArr.push([property, obj[property]])
  }
  return newArr
}

// findOneByProperty should return an object from `arr` that has the
// property AND value of `search`. For example, given:
//   [{a: 1}, {b: 2, c: 3}] and {b: 2}
// it will return:
//   {b: 2, c: 3}
function findOneByProperty (arr, search) {
}

// findAll should return an array containing all objects in `arr` that
// have the property and value of `search`
function findAll (arr, search) {

}

module.exports = {
  addName,
  ageOneYear,
  deleteItem,
  deleteItemAtIndex,
  deleteProperty,
  getGreeting,
  getItemAtIndex,
  getKeys,
  getPropertyValue,
  getValues,
  findOneByProperty,
  findAll,
  hasItem,
  insertItemAtIndex,
  makeArrayOfItem,
  makeArrayOfItems,
  makeObject,
  replaceItemAtIndex,
  returnErrorIfFalsy,
  unzipObject,
  zipObject
}

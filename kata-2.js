
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

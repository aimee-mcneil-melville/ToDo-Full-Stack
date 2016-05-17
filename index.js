module.exports = {
  each: each,
  getType: getType,
  getValue: getValue,
  getAddress: getAddress,
  getFirst: getFirst,
  getLast: getLast,
  getValueTypes: getValueTypes,
  getMatrix: getMatrix,
  updateMatrix: updateMatrix,
  where: where
}

function each (func, arr) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i])
  }
}

function getType (thing) {
}

function getValueTypes (obj) {
}

function getFirst (arr) {
}

function getLast (arr) {
}

function getValue (obj, key) {
}

function getAddress (obj) {
}

function where (arr, propertiesObj) {
}

function getMatrix (n) {
}

function updateMatrix (matrix, coords, value) {
}

function each (func, arr) {
	for (var i = 0; i < arr.length; i++) {
		func(arr[i])
	}
}

function getType (thing) {
	return typeof thing
}

function getValueTypes (obj) {
	var keys = Object.keys(obj)
  return keys.map(function (key) {
  	return typeof obj[key]
  })
}

function getFirst (arr) {
	return arr[0]
}

function getLast (arr) {
	return arr[arr.length - 1]
}

function getValue (obj, key) {
	return obj[key]
}

function getAddress (obj) {
	return obj.address
}

function where (arr, propertiesObj) {
	var keys = Object.keys(propertiesObj)

	return arr.filter(function (item) {
		return keys.every(function (key) {
			return item[key] === propertiesObj[key]
		})
	})
}



// warm up

// arrays
function getMatrix (n) {
	var matrix = []
	for (var i = 0; i < n; i++) {
		matrix.push([])
		for (var j = 0; j < n; j++) {
			matrix[i].push(0)
		}
	}
	return matrix
}

function updateMatrix (matrix, coords, value) {
	matrix[coords[0]][coords[1]] = value
	return matrix
}


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

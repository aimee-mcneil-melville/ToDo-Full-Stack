function getType () {}

function getValueTypes (obj) {
  return []
}



// warm up

// arrays
function getMatrix (n) {
  return Array(n).map(function (row) {
    return Array(n).map (function (cell) { return 0 })
  })
}


//objects



module.exports = {
  getValueTypes: getValueTypes,
  getMatrix: getMatrix
}

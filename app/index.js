var domready = require('domready')
var kata = require('../')
var lib = require('./lib')
var initialRender = lib.initialRender

function updateCell (row, col, value) {  
  var cell = document.querySelector('#row-' + row + '-col-' + col)
  cell.textContent = value
}

domready(function () {
  var board = kata.getMatrix(3)
  var table = initialRender(board, '#root')

  table.addEventListener('click', function (e) {
    var cellIdAsArray = e.target.id.split('-')
    var row = cellIdAsArray[1]
    var col = cellIdAsArray[3]

    updateCell(row, col, 1)
  })
})

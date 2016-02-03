var domready = require('domready')
var kata = require('../')
var lib = require('./lib')
var initialRender = lib.initialRender

function updateCell (row, col, value) {  
  // your code here

}

domready(function () {
  var board = kata.getMatrix(3)
  var table = initialRender(board, '#root')

  table.addEventListener('click', function (e) {
    // your code here
  
  })
})

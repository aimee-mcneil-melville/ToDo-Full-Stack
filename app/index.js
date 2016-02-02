var domready = require('domready')
var kata = require('../')
var lib = require('./lib')
var initialRender = lib.initialRender


function updateBoard (board) {

}


function handleSquareClick (e) {

}


function app () {


}

domready(function () {
  
  var boardData = kata.getMatrix(3)
  var table = initialRender(boardData, '#root')

  table.addEventListener('click', function (e) {
  	console.log(e.target)

  })
  
  
  




})

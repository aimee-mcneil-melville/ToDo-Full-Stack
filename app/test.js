var test = require('tape')
var lib = require('./lib')
var initialRender = lib.initialRender
var matrix = [
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ]
]

test('it renders the table matrix on the page', function (t) {
	// setup
	var root = document.createElement('div')
	root.id = 'root'
	document.body.appendChild(root)

	var table = initialRender(matrix, '#root')

	t.ok(table)

	t.end()





})
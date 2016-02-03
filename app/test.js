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

  for (var i = 0; i < table.childNodes.length; i++) {
    var row = table.childNodes[i]
    for (var j = 0; j < row.childNodes.length; j++) {
      var cell = row.childNodes[j]
      var expectedId = 'row-' + i + '-col-' + j
      t.equal(cell.id, expectedId, 'the cell has the correct id: ', expectedId)
    }
  }

	t.end()
})

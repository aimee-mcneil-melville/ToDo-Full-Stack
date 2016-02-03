function initialRender (board, rootSelector) {
	var root = document.querySelector(rootSelector)
	var table = document.createElement('table')

	board.forEach(function (row, i) {
		var tRow = document.createElement('tr')
		row.forEach(function (cell, j) {
			var tCell = document.createElement('td')
			tCell.textContent = cell
			tCell.id = 'row-' + i + '-col-' + j
			tRow.appendChild(tCell)
		})
		table.appendChild(tRow)
	})

	root.appendChild(table)

	return table
}

module.exports = {
	initialRender: initialRender
}

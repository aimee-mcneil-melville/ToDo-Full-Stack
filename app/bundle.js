(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    var cellIdAsArray = e.target.id.split('-')
    var row = cellIdAsArray[1]
    var col = cellIdAsArray[3]

    console.log(row, cell)

  })
  
  
  




})

},{"../":3,"./lib":2,"domready":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvaW5kZXguanMiLCJhcHAvbGliL2luZGV4LmpzIiwiaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5JylcbnZhciBrYXRhID0gcmVxdWlyZSgnLi4vJylcbnZhciBsaWIgPSByZXF1aXJlKCcuL2xpYicpXG52YXIgaW5pdGlhbFJlbmRlciA9IGxpYi5pbml0aWFsUmVuZGVyXG5cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmQgKGJvYXJkKSB7XG5cbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVTcXVhcmVDbGljayAoZSkge1xuXG59XG5cblxuZnVuY3Rpb24gYXBwICgpIHtcblxuXG59XG5cbmRvbXJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBib2FyZERhdGEgPSBrYXRhLmdldE1hdHJpeCgzKVxuICB2YXIgdGFibGUgPSBpbml0aWFsUmVuZGVyKGJvYXJkRGF0YSwgJyNyb290JylcblxuICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNlbGxJZEFzQXJyYXkgPSBlLnRhcmdldC5pZC5zcGxpdCgnLScpXG4gICAgdmFyIHJvdyA9IGNlbGxJZEFzQXJyYXlbMV1cbiAgICB2YXIgY29sID0gY2VsbElkQXNBcnJheVszXVxuXG4gICAgY29uc29sZS5sb2cocm93LCBjZWxsKVxuXG4gIH0pXG4gIFxuICBcbiAgXG5cblxuXG5cbn0pXG4iLCJmdW5jdGlvbiBpbml0aWFsUmVuZGVyIChib2FyZCwgcm9vdFNlbGVjdG9yKSB7XG5cdHZhciByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290U2VsZWN0b3IpXG5cdHZhciB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcblxuXHRib2FyZC5mb3JFYWNoKGZ1bmN0aW9uIChyb3csIGkpIHtcblx0XHR2YXIgdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcblx0XHRyb3cuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCwgaikge1xuXHRcdFx0dmFyIHRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuXHRcdFx0dENlbGwudGV4dENvbnRlbnQgPSBjZWxsXG5cdFx0XHR0Q2VsbC5pZCA9ICdyb3ctJyArIGkgKyAnLWNvbC0nICsgalxuXHRcdFx0dFJvdy5hcHBlbmRDaGlsZCh0Q2VsbClcblx0XHR9KVxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRSb3cpXG5cdH0pXG5cblx0cm9vdC5hcHBlbmRDaGlsZCh0YWJsZSlcblxuXHRyZXR1cm4gdGFibGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGluaXRpYWxSZW5kZXI6IGluaXRpYWxSZW5kZXJcbn1cbiIsImZ1bmN0aW9uIGVhY2ggKGZ1bmMsIGFycikge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdGZ1bmMoYXJyW2ldKVxuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFR5cGUgKHRoaW5nKSB7XG5cdHJldHVybiB0eXBlb2YgdGhpbmdcbn1cblxuZnVuY3Rpb24gZ2V0VmFsdWVUeXBlcyAob2JqKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkge1xuICBcdHJldHVybiB0eXBlb2Ygb2JqW2tleV1cbiAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0Rmlyc3QgKGFycikge1xuXHRyZXR1cm4gYXJyWzBdXG59XG5cbmZ1bmN0aW9uIGdldExhc3QgKGFycikge1xuXHRyZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXVxufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZSAob2JqLCBrZXkpIHtcblx0cmV0dXJuIG9ialtrZXldXG59XG5cbmZ1bmN0aW9uIGdldEFkZHJlc3MgKG9iaikge1xuXHRyZXR1cm4gb2JqLmFkZHJlc3Ncbn1cblxuZnVuY3Rpb24gd2hlcmUgKGFyciwgcHJvcGVydGllc09iaikge1xuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXNPYmopXG5cblx0cmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRyZXR1cm4ga2V5cy5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gaXRlbVtrZXldID09PSBwcm9wZXJ0aWVzT2JqW2tleV1cblx0XHR9KVxuXHR9KVxufVxuXG5cblxuLy8gd2FybSB1cFxuXG4vLyBhcnJheXNcbmZ1bmN0aW9uIGdldE1hdHJpeCAobikge1xuXHR2YXIgbWF0cml4ID0gW11cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcblx0XHRtYXRyaXgucHVzaChbXSlcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG47IGorKykge1xuXHRcdFx0bWF0cml4W2ldLnB1c2goMClcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hdHJpeFxufVxuXG5mdW5jdGlvbiB1cGRhdGVNYXRyaXggKG1hdHJpeCwgY29vcmRzLCB2YWx1ZSkge1xuXHRtYXRyaXhbY29vcmRzWzBdXVtjb29yZHNbMV1dID0gdmFsdWVcblx0cmV0dXJuIG1hdHJpeFxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRlYWNoOiBlYWNoLFxuXHRnZXRUeXBlOiBnZXRUeXBlLFxuXHRnZXRWYWx1ZTogZ2V0VmFsdWUsXG5cdGdldEFkZHJlc3M6IGdldEFkZHJlc3MsXG5cdGdldEZpcnN0OiBnZXRGaXJzdCxcblx0Z2V0TGFzdDogZ2V0TGFzdCxcbiAgZ2V0VmFsdWVUeXBlczogZ2V0VmFsdWVUeXBlcyxcbiAgZ2V0TWF0cml4OiBnZXRNYXRyaXgsXG4gIHVwZGF0ZU1hdHJpeDogdXBkYXRlTWF0cml4LFxuICB3aGVyZTogd2hlcmVcbn1cbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDE0IC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcblxufSgnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZucyA9IFtdLCBsaXN0ZW5lclxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXG4gICAgLCBkb21Db250ZW50TG9hZGVkID0gJ0RPTUNvbnRlbnRMb2FkZWQnXG4gICAgLCBsb2FkZWQgPSAoaGFjayA/IC9ebG9hZGVkfF5jLyA6IC9ebG9hZGVkfF5pfF5jLykudGVzdChkb2MucmVhZHlTdGF0ZSlcblxuXG4gIGlmICghbG9hZGVkKVxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lcilcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGxpc3RlbmVyID0gZm5zLnNoaWZ0KCkpIGxpc3RlbmVyKClcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgbG9hZGVkID8gc2V0VGltZW91dChmbiwgMCkgOiBmbnMucHVzaChmbilcbiAgfVxuXG59KTtcbiJdfQ==

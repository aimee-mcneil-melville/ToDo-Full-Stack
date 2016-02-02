(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var domready = require('domready')
var kata = require('../')
var lib = require('./lib')
var initialRender = lib.initialRender


function updateBoard (board) {

}

function listen (table) {
	table.add
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

},{"../":3,"./lib":2,"domready":4}],2:[function(require,module,exports){
function initialRender (board, rootSelector) {
	var root = document.querySelector(rootSelector)
	var table = document.createElement('table')

	board.forEach(function (row, i) {
		var tRow = document.createElement('tr')
		row.forEach(function (cell, j) {
			var tCell = document.createElement('td')
			tCell.textContent = cell
			tCell.classList.add('row-' + i)
			tCell.classList.add('col-' + j)
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


//objects



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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9pbmRleC5qcyIsImFwcC9saWIvaW5kZXguanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb21yZWFkeS9yZWFkeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGRvbXJlYWR5ID0gcmVxdWlyZSgnZG9tcmVhZHknKVxudmFyIGthdGEgPSByZXF1aXJlKCcuLi8nKVxudmFyIGxpYiA9IHJlcXVpcmUoJy4vbGliJylcbnZhciBpbml0aWFsUmVuZGVyID0gbGliLmluaXRpYWxSZW5kZXJcblxuXG5mdW5jdGlvbiB1cGRhdGVCb2FyZCAoYm9hcmQpIHtcblxufVxuXG5mdW5jdGlvbiBsaXN0ZW4gKHRhYmxlKSB7XG5cdHRhYmxlLmFkZFxufVxuXG5mdW5jdGlvbiBoYW5kbGVTcXVhcmVDbGljayAoZSkge1xuXG59XG5cblxuZnVuY3Rpb24gYXBwICgpIHtcblxuXG59XG5cbmRvbXJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBib2FyZERhdGEgPSBrYXRhLmdldE1hdHJpeCgzKVxuICB2YXIgdGFibGUgPSBpbml0aWFsUmVuZGVyKGJvYXJkRGF0YSwgJyNyb290JylcblxuICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gIFx0Y29uc29sZS5sb2coZS50YXJnZXQpXG5cbiAgfSlcbiAgXG4gIFxuICBcblxuXG5cblxufSlcbiIsImZ1bmN0aW9uIGluaXRpYWxSZW5kZXIgKGJvYXJkLCByb290U2VsZWN0b3IpIHtcblx0dmFyIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RTZWxlY3Rvcilcblx0dmFyIHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuXG5cdGJvYXJkLmZvckVhY2goZnVuY3Rpb24gKHJvdywgaSkge1xuXHRcdHZhciB0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuXHRcdHJvdy5mb3JFYWNoKGZ1bmN0aW9uIChjZWxsLCBqKSB7XG5cdFx0XHR2YXIgdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG5cdFx0XHR0Q2VsbC50ZXh0Q29udGVudCA9IGNlbGxcblx0XHRcdHRDZWxsLmNsYXNzTGlzdC5hZGQoJ3Jvdy0nICsgaSlcblx0XHRcdHRDZWxsLmNsYXNzTGlzdC5hZGQoJ2NvbC0nICsgailcblx0XHRcdHRSb3cuYXBwZW5kQ2hpbGQodENlbGwpXG5cdFx0fSlcblx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0Um93KVxuXHR9KVxuXG5cdHJvb3QuYXBwZW5kQ2hpbGQodGFibGUpXG5cblx0cmV0dXJuIHRhYmxlXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRpbml0aWFsUmVuZGVyOiBpbml0aWFsUmVuZGVyXG59IiwiZnVuY3Rpb24gZWFjaCAoZnVuYywgYXJyKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZnVuYyhhcnJbaV0pXG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0VHlwZSAodGhpbmcpIHtcblx0cmV0dXJuIHR5cGVvZiB0aGluZ1xufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZVR5cGVzIChvYmopIHtcblx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopXG4gIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gIFx0cmV0dXJuIHR5cGVvZiBvYmpba2V5XVxuICB9KVxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdCAoYXJyKSB7XG5cdHJldHVybiBhcnJbMF1cbn1cblxuZnVuY3Rpb24gZ2V0TGFzdCAoYXJyKSB7XG5cdHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdXG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlIChvYmosIGtleSkge1xuXHRyZXR1cm4gb2JqW2tleV1cbn1cblxuZnVuY3Rpb24gZ2V0QWRkcmVzcyAob2JqKSB7XG5cdHJldHVybiBvYmouYWRkcmVzc1xufVxuXG5mdW5jdGlvbiB3aGVyZSAoYXJyLCBwcm9wZXJ0aWVzT2JqKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllc09iailcblxuXHRyZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuXHRcdHJldHVybiBrZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBpdGVtW2tleV0gPT09IHByb3BlcnRpZXNPYmpba2V5XVxuXHRcdH0pXG5cdH0pXG59XG5cblxuXG4vLyB3YXJtIHVwXG5cbi8vIGFycmF5c1xuZnVuY3Rpb24gZ2V0TWF0cml4IChuKSB7XG5cdHZhciBtYXRyaXggPSBbXVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuXHRcdG1hdHJpeC5wdXNoKFtdKVxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgbjsgaisrKSB7XG5cdFx0XHRtYXRyaXhbaV0ucHVzaCgwKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWF0cml4XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1hdHJpeCAobWF0cml4LCBjb29yZHMsIHZhbHVlKSB7XG5cdG1hdHJpeFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPSB2YWx1ZVxuXHRyZXR1cm4gbWF0cml4XG59XG5cblxuLy9vYmplY3RzXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZWFjaDogZWFjaCxcblx0Z2V0VHlwZTogZ2V0VHlwZSxcblx0Z2V0VmFsdWU6IGdldFZhbHVlLFxuXHRnZXRBZGRyZXNzOiBnZXRBZGRyZXNzLFxuXHRnZXRGaXJzdDogZ2V0Rmlyc3QsXG5cdGdldExhc3Q6IGdldExhc3QsXG4gIGdldFZhbHVlVHlwZXM6IGdldFZhbHVlVHlwZXMsXG4gIGdldE1hdHJpeDogZ2V0TWF0cml4LFxuICB1cGRhdGVNYXRyaXg6IHVwZGF0ZU1hdHJpeCxcbiAgd2hlcmU6IHdoZXJlXG59XG4iLCIvKiFcbiAgKiBkb21yZWFkeSAoYykgRHVzdGluIERpYXogMjAxNCAtIExpY2Vuc2UgTUlUXG4gICovXG4hZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG5cbn0oJ2RvbXJlYWR5JywgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmbnMgPSBbXSwgbGlzdGVuZXJcbiAgICAsIGRvYyA9IGRvY3VtZW50XG4gICAgLCBoYWNrID0gZG9jLmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbFxuICAgICwgZG9tQ29udGVudExvYWRlZCA9ICdET01Db250ZW50TG9hZGVkJ1xuICAgICwgbG9hZGVkID0gKGhhY2sgPyAvXmxvYWRlZHxeYy8gOiAvXmxvYWRlZHxeaXxeYy8pLnRlc3QoZG9jLnJlYWR5U3RhdGUpXG5cblxuICBpZiAoIWxvYWRlZClcbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIpXG4gICAgbG9hZGVkID0gMVxuICAgIHdoaWxlIChsaXN0ZW5lciA9IGZucy5zaGlmdCgpKSBsaXN0ZW5lcigpXG4gIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIGxvYWRlZCA/IHNldFRpbWVvdXQoZm4sIDApIDogZm5zLnB1c2goZm4pXG4gIH1cblxufSk7XG4iXX0=

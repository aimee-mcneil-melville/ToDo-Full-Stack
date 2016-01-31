
var monsters = [
  { 
    name: 'Count Dracula', 
    email: 'dracula@hotmail.com', 
    country: 'Transylvania',
    age: 588,
  },
  { 
    name: "Frankenstein's Monster", 
    email: 'franky@monster.com', 
    country: 'Switzerland',
    age: 232,
  },
  { 
    name: 'Cthulhu', 
    email: 'cthulhu@thedeep.com', 
    country: "R'lyeh", 
    age: 1038902,
  },
  { 
    name: 'Taniwha', 
    email: 'taniwha@awa.com', 
    country: 'Aotearoa', 
    age: 232
  }
]

function liTemplate (name, country, age) {
}

function renderListItems (list, data) {
  // remove element and create a fresh one
}

function setupElements () {
  var input = document.createElement('input')
  var label = document.createElement('label')
  var list = document.createElement('ul')
  input.type = 'number'
  label.textContent = 'filter the monsters by age' 

  return [ input, label, list ]
}

function filter (arr, keyValue) {
}

function app (data) {
  var elements = setupElements()
  elements.forEach(function (el) {
    document.body.appendChild(el)
  })
  renderListItems(elements[2], data)

  var inputFilter = elements[0]
  inputFilter.addEventListener('input', function (e) {
  }, true)
}

document.addEventListener('DOMContentLoaded', function() {
  app(monsters)
})


// test(monsters)







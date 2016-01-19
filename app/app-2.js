
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
  var li = document.createElement('li')
  li.innerHTML = [ 
    'Name: ',
    name,
    '; Country: ',
    country,
    '; Age: ',
    age
  ].join('')

  return li
}

function renderListItems (list, data) {
  // remove element and create a fresh one
  list.parentNode.removeChild(list) 
  var newList = document.createElement('ul')
  document.body.appendChild(newList)
  
  for (var i = 0; i < data.length; i++) {
    var li = liTemplate(data[i].name, data[i].country, data[i].age)
    newList.appendChild(li)
  }
}

function setupElements (data) {
  var list = document.createElement('ul')
  var input = document.createElement('input')
  var label = document.createElement('label')
  input.type = 'number'
  label.innerHTML = 'filter the monsters by age' 

  var elements = [ input, label, list ]
  elements.forEach(function (el) {
    document.body.appendChild(el)
  })

  renderListItems(list, data)
}

function filter (arr, keyValue) {
  var key = Object.keys(keyValue)[0]
  var results = []

  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === keyValue[key]) {
      results.push(arr[i])
    }
  }

  return results
}

function app (data) {
  setupElements(data)
  var inputFilter = document.querySelector('input')

  inputFilter.addEventListener('input', function (e) {
    console.log(e)
    var list = document.querySelector('ul')
    if (e.target.value === '') {
      renderListItems(list, data)
    } else {
      var filteredMonsters = filter(data, { age: inputFilter.valueAsNumber})
      console.log(filteredMonsters)
      renderListItems(list, filteredMonsters) 
    }
  }, true)
}

document.addEventListener('DOMContentLoaded', function() {
  app(monsters)
  test(monsters)
})







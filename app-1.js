var data = [
  { name: 'Athos', age: 30 },
  { name: 'Porthos', age: 32 },
  { name: 'Aramis', age: 28 }
]

function liTemplate (name) {
  var li = document.createElement('li')
  li.innerHTML = name
  return li
}

function app (data) {
  var ul = document.createElement('ul')
  document.body.appendChild(ul)

  for (var i = 0; i < data.length; i++) {
    var li = liTemplate(data[i].name)
    ul.appendChild(li)
  }
  
}

document.addEventListener('DOMContentLoaded', function() {
  app(data)
})

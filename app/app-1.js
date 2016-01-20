var data = [
  { name: 'Athos', age: 30 },
  { name: 'Porthos', age: 32 },
  { name: 'Aramis', age: 28 }
]

function liTemplate (name) {
  var li = document.createElement('li')
  li.textContent = name
  return li
}

function app (data) {
  var ul = document.createElement('ul')
  document.body.appendChild(ul)

  var listItems = data.map(function (d) {
    return liTemplate(d.name)
  })

  listItems.forEach(function (item) {
    ul.appendChild(item)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  app(data)
})

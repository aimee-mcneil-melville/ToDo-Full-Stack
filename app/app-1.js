var data = [
  { name: 'Athos', age: 30 },
  { name: 'Porthos', age: 32 },
  { name: 'Aramis', age: 28 }
]

function liTemplate (name) {
}

function app (data) {
  var ul = document.createElement('ul')
  document.body.appendChild(ul)

}

document.addEventListener('DOMContentLoaded', function() {
  app(data)
})

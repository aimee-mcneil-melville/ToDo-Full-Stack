function test () {
  var element = document.querySelector('ul')


  console.log('Unordered list exists: ', typeof element !== 'undefined')
  
  if (element && element.children.length > 0) {
    for (var i = 0; i < element.children.length; i++) {
      console.log(element.children[i])
    }
  }

}

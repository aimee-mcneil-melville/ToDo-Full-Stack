function test () {
  var inputFilter = document.querySelector('input')
  inputFilter.value = '232'
  inputFilter.valueAsNumber = 232
  
  var inputEvent = new Event('input')
  inputFilter.dispatchEvent(inputEvent)
  var list = document.querySelector('ul')

  console.log('the filtered list has a length of 2: ', list.childNodes.length === 2)
  for (var i = 0; i < list.childNodes.length; i++) {
    var item = list.childNodes[i]
    console.log('item ' + i + ' has an age of 232: ', item.innerHTML.indexOf('232') > -1) 
  }
}


var React = require('react')
var ReactDOM = require('react-dom')

function App (props) {
  return (
    <h1>{props.message}</h1>
  )
}

var data = { message: "Future home of Charlotte's web" }
var view = App(data)

var placeToMount = document.getElementById('root')

ReactDOM.render(view, placeToMount)


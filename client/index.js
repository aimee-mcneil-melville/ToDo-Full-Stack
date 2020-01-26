import React from 'react'
import ReactDOM from 'react-dom'

function App (props) {
  return (
    <h1>{props.message.text}</h1>
  )
}

const message = { text: "Future home of Charlotte's web" }

ReactDOM.render(
  <App message={message} />,
  document.getElementById('root')
)

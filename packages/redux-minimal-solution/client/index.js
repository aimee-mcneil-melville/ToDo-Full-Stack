import React from 'react'
import ReactDOM from 'react-dom'

import store from './store'
import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  render()
  store.subscribe(render)
})

function render () {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}

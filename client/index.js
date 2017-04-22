import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App width={window.innerWidth} height={window.innerHeight} />,
    document.getElementById('app')
  )
})

import React from 'react'
import ReactDOM from 'react-dom'

import '../server/public/style/main.scss'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'))
})

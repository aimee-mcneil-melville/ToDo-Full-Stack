import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import App from './components/App'
import store from './store'

const app = document.getElementById('app')
const root = createRoot(app)

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

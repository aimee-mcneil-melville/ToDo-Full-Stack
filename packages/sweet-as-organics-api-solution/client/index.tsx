import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
})

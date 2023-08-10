import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store.ts'

import App from './components/App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

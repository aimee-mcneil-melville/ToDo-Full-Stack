import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App.tsx'
import { store } from './store.ts'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

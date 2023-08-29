import { createRoot } from 'react-dom/client'
import store from './store.ts'

import App from './components/App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('app') as HTMLElement)

  function render() {
    root.render(<App />)
  }

  render()
  store.subscribe(render)
})

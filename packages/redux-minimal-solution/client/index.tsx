import { createRoot } from 'react-dom/client'
import store from './store'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('app') as HTMLElement)

  function render() {
    root.render(<App />)
  }

  render()
  store.subscribe(render)
})
